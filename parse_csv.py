import csv
import json
import re

raw_csv_path = "src/data/raw_full_medicines.csv"
output_json_path = "src/data/allProducts.json"

def derive_category(name, unit):
    upper = (name + ' ' + unit).upper()
    if any(x in upper for x in ['CATHETER', 'BANDAGE', 'TUBE', 'CANNULA', 'NEEDLE', 'SYRINGE', 'GAUZE', 'COTTON', 'GLOVES', 'GLOVE', 'DISPOSABLE', 'STENT', 'WIRE', 'DRAIN', 'MASK', 'PLASTER', 'SUTURE', 'VICRYL', 'PROLENE', 'SILK', 'BLADE', 'PAD', 'AIRWAY', 'SET', 'BAG', 'SWAB', 'TAPE', 'MICROPORE']):
        return 'Surgical & Disposable'
    if any(x in upper for x in ['STRIP', 'KIT', 'TEST', 'BP', 'THERMOMETER', 'METER', 'SCALE', 'MONITOR', 'STETHOSCOPE', 'SPHYGMO', 'LANCET', 'LENCET']):
        return 'Diagnostic & Equipment'
    if any(x in upper for x in ['INJ', 'INFUSION', 'AMP', 'VIAL', 'DRIP', 'DEXTROSE', 'SALINE', 'RINGER', 'WATER FOR INJ']):
        return 'Injectable & Infusion'
    if any(x in upper for x in ['TAB', 'CAP', 'SACHET', 'SACH', 'CAPLET', 'TABLET', 'CAPSULE']):
        return 'Oral Solid (Tablet / Capsule)'
    if any(x in upper for x in ['SYP', 'SUSP', 'SOLUTION', 'DROPS', 'DROP', 'ELIXIR', 'SUSPENSION', 'MIXTURE', 'SYRUP']):
        return 'Liquid & Suspensions'
    if any(x in upper for x in ['CREAM', 'OINT', 'GEL', 'LOTION', 'BALM', 'SOAP', 'PASTE', 'SCRUB']):
        return 'Topical / Dermatological'
    return 'Pharmaceutical & Healthcare'

def compute_search_index(name, code, company, unit, category_tag):
    name_clean = re.sub(r'^[\.\s*]+', '', name).strip()
    upper = (name_clean + ' ' + unit + ' ' + category_tag + ' ' + company).upper()
    
    synonyms = []
    
    # Clean words and variations
    # 1. Spaced & unspaced units
    # e.g. 500MG -> 500 mg, 100ML -> 100 ml, 5CC -> 5 cc, 20G -> 20 g
    units_found = re.findall(r'(\d+)\s*(MG|ML|CC|G|IU|MCG|GM|KG|L)\b', upper)
    for num, u in units_found:
        synonyms.append(f"{num}{u.lower()}")
        synonyms.append(f"{num} {u.lower()}")
    
    # 2. Fractions: 1/2 -> half, 1/5 -> fifth
    if '1/2' in upper:
        synonyms.append('1/2 half')
    if '1/5' in upper:
        synonyms.append('1/5 pediatric peads')

    # 3. Dosage form expansions & plurals
    if re.search(r'\b(TAB|TABLET|TABLETS)\b', upper):
        synonyms.append('tab tablet tablets oral solid blister strip pill pills')
    if re.search(r'\b(CAP|CAPSULE|CAPSULES)\b', upper):
        synonyms.append('cap capsule capsules oral solid blister softgel')
    if re.search(r'\b(INJ|INJECTION|INJECTIONS|AMP|VIAL|VIALS|ACT-O-VIAL)\b', upper):
        synonyms.append('inj injection injections ampoule ampoules vial vials injectable amp')
    if re.search(r'\b(SYP|SYRUP|SYRUPS)\b', upper):
        synonyms.append('syp syrup syrups liquid oral suspension')
    if re.search(r'\b(SUSP|SUSPENSION|SUSPENSIONS)\b', upper):
        synonyms.append('susp suspension suspensions liquid oral syrup')
    if re.search(r'\b(INFUSION|INFUSIONS|DRIP|IV)\b', upper):
        synonyms.append('infusion infusions iv fluid drip intravenous bottle 500ml 1000ml')
    if re.search(r'\b(DROP|DROPS)\b', upper):
        synonyms.append('drop drops eye ear pediatric oral bottle')
    if re.search(r'\b(CREAM|OINT|OINTMENT|GEL|LOTION|SCRUB)\b', upper):
        synonyms.append('cream ointment gel lotion topical skin derm scrub')
    if re.search(r'\b(SACH|SACHET|SACHETS)\b', upper):
        synonyms.append('sach sachet sachets powder drink')

    # 4. Surgical disposables expansions
    if re.search(r'\b(CANNULA|CANNULAS|VENFLON)\b', upper):
        synonyms.append('cannula cannulas iv cannula i.v cannula i.v. cannula branula catheter venflon with port wings')
    if re.search(r'\b(CATHETER|CATHETERS|FOLEY|FOLEYS)\b', upper):
        synonyms.append('catheter catheters foley foleys foley catheter urinary 2-way 3-way rusch silicone latex')
    if re.search(r'\b(SYRINGE|SYRINGES)\b', upper):
        synonyms.append('syringe syringes disposable syringe 1cc 3cc 5cc 10cc 20cc 50cc insulin syringe auto disable')
    if re.search(r'\b(NEEDLE|NEEDLES|SCALP VEIN|BUTTERFLY)\b', upper):
        synonyms.append('needle needles scalp vein butterfly needle spinal needle aspiration hypodermic')
    if re.search(r'\b(GLOVE|GLOVES)\b', upper):
        synonyms.append('glove gloves surgical gloves examination gloves sterile latex nitrile powder free pair box')
    if re.search(r'\b(MASK|MASKS)\b', upper):
        synonyms.append('mask masks face mask surgical mask 3-ply 3ply n95 respirator')
    if re.search(r'\b(TAPE|MICROPORE|PLASTER|LEUKOPLAST)\b', upper):
        synonyms.append('surgical tape micropore paper tape adhesive tape plaster zinc oxide leukoplast transfix')
    if re.search(r'\b(BANDAGE|BANDAGES|CREPE|GAUZE|COTTON|SPONGE|SPUNGE)\b', upper):
        synonyms.append('bandage bandages crepe bandage cotton gauze roll sponge spunge sterile gauze swabs roll dressing')
    if re.search(r'\b(TUBE|TUBES|ETT|ENDOTRACHEAL|SUCTION|NG)\b', upper):
        synonyms.append('tube tubes endotracheal ett suction catheter nasogastric ng tube chest tube airway')
    if re.search(r'\b(SET|DRIP SET|INFUSION SET|BT SET|BLOOD TRANSFUSION|BURETTE|SOLUSET)\b', upper):
        synonyms.append('set sets iv set i.v set i.v. set drip set infusion set bt set b.t set blood set blood transfusion set burette soluset')
    if re.search(r'\b(STRIP|STRIPS|GLUCOSE|GLUCOMETER|ACCU-CHEK|ACCUA CHECK)\b', upper):
        synonyms.append('strip strips test strips glucose glucometer accu-chek accu chek accua check active instant diabetes lancet')
    if re.search(r'\b(BP|SPHYGMO|STETHOSCOPE|THERMOMETER)\b', upper):
        synonyms.append('bp apparatus b.p apparatus blood pressure cuff bulb bladder mercurial aneroid dial stethoscope thermometer')
    if re.search(r'\b(SWAB|SWABS|ALCOHAL|ALCOHOL|SPIRIT)\b', upper):
        synonyms.append('swab swabs alcohol swab alcohal swab spirit prep pad pads')
    if re.search(r'\b(SUTURE|VICRYL|PROLENE|SILK)\b', upper):
        synonyms.append('suture sutures vicryl prolene silk absorbable non-absorbable ethicon surgery stitch')

    # 5. Generic Drugs & Major Pakistani Brands associations
    if any(x in upper for x in ['PANADOL', 'PARACETAMOL', 'CALPOL', 'ADEGESIC', 'CETAFEND', 'FEVAGESIC', 'FLASAN', 'PERFALGAN', 'PARALGAN', 'FEBROL', 'DISPROL']):
        synonyms.append('panadol paracetamol paracetomol calpol acetaminophen fevagesic adegesic fever pain relief headache antipyretic gsk drops cf extra extend')
    if any(x in upper for x in ['BRUFEN', 'IBUPROFEN']):
        synonyms.append('brufen ibuprofen burfen abbott nsaid pain inflammation fever ds syrup 200mg 400mg')
    if any(x in upper for x in ['PONSTAN', 'MEFENAMIC']):
        synonyms.append('ponstan ponston mefenamic acid pfizer pain killer analgesic forte 250mg 500mg')
    if any(x in upper for x in ['DISPRIN', 'ASPIRIN', 'LOPRIN', 'ASCARD']):
        synonyms.append('disprin dispirin aspirin acetylsalicylic acid loprin ascard headache blood thinner soluble')
    if any(x in upper for x in ['RISEK', 'OMEPRAZOLE', 'LOSEC', 'PROSEPT', 'ELIPRAZOLE']):
        synonyms.append('risek omeprazole omeperazole losec getz ppi antacid acid peptic ulcer gerd 20mg 40mg insta')
    if any(x in upper for x in ['NEXUM', 'ESOMEPRAZOLE']):
        synonyms.append('nexum esomeprazole getz ppi antacid gerd heartburn 20mg 40mg')
    if any(x in upper for x in ['AUGMENTIN', 'CO-AMOXICLAV', 'AMOXICILLIN', 'AMOXIL', 'CURAM', 'CLAVIL']):
        synonyms.append('augmentin amoxicillin amoxil co-amoxiclav co amoxiclav clavulanic acid gsk antibiotic infection 375mg 625mg 1g 156mg 312mg 457mg')
    if any(x in upper for x in ['FLAGYL', 'METRONIDAZOLE', 'ENTAMIZOLE', 'NIDAZOLE']):
        synonyms.append('flagyl metronidazole sanofi antiprotozoal antibiotic diarrhea loose motion amoebic 200mg 400mg')
    if any(x in upper for x in ['NOVIDAT', 'CIPROFLOXACIN', 'CIPRO', 'CIPROXIN']):
        synonyms.append('novidat ciprofloxacin cipro sami fluoroquinolone antibiotic 250mg 500mg 750mg')
    if any(x in upper for x in ['CEFTRIAXONE', 'ROCEPHIN', 'EPICEF', 'CEFTRON', 'XONE']):
        synonyms.append('ceftriaxone rocephin antibiotic injection 3rd generation cephalosporin 250mg 500mg 1g 2g iv im')
    if any(x in upper for x in ['CEFIXIME', 'BRISCEF', 'CEFSPAN', 'CARICEF', 'CEFIM', 'CEF-4']):
        synonyms.append('cefixime briscef cefspan caricef cefim 3rd generation cephalosporin antibiotic 100mg 200mg 400mg ds')
    if any(x in upper for x in ['KLARICID', 'CLARITHROMYCIN']):
        synonyms.append('klaricid clarithromycin abbott macrolide antibiotic 250mg 500mg 125mg 250mg')
    if any(x in upper for x in ['AZOMAX', 'ZITHROMAX', 'AZITHROMYCIN', 'AZIT']):
        synonyms.append('azomax zithromax azithromycin sami pfizer macrolide antibiotic 250mg 500mg')
    if any(x in upper for x in ['GRAVINATE', 'DIMENHYDRINATE']):
        synonyms.append('gravinate gravinet dimenhydrinate searle motion sickness vomiting nausea vertigo 50mg')
    if any(x in upper for x in ['BUSCOPAN', 'HYOSCINE', 'SPASLER']):
        synonyms.append('buscopan hyoscine butylbromide sanofi antispasmodic abdominal pain cramps colic')
    if any(x in upper for x in ['NO-SPA', 'NOSPA', 'DROTAVERINE']):
        synonyms.append('no-spa nospa no spa drotaverine sanofi antispasmodic spasm abdominal pain')
    if any(x in upper for x in ['MAXOLON', 'METOCLOPRAMIDE', 'PLASIL']):
        synonyms.append('maxolon metoclopramide gsk antiemetic nausea vomiting motility')
    if any(x in upper for x in ['ZOFRAN', 'ONDANSETRON', 'EMESET', 'ONSET']):
        synonyms.append('zofran ondansetron emeset gsk antiemetic 4mg 8mg vomiting nausea')
    if any(x in upper for x in ['TRANSAMIN', 'TRANEXAMIC', 'PLADMIN']):
        synonyms.append('transamin tranexamic acid hilton antifibrinolytic bleeding hemorrhage 250mg 500mg')
    if any(x in upper for x in ['VOLTRAL', 'VOREN', 'DICLOFENAC', 'DICLORAN', 'CLOFEN']):
        synonyms.append('voltral voren diclofenac sodium potassium dicloran novartis nsaid pain killer 50mg 75mg 100mg emulgel')
    if any(x in upper for x in ['TRAMAL', 'TRAMADOL', 'TREMAC']):
        synonyms.append('tramal tramadol searl opioid analgesic severe pain 50mg 100mg')
    if any(x in upper for x in ['TORADOL', 'KETOROLAC', 'KETOLAC']):
        synonyms.append('toradol ketorolac tromethamine atco nsaid pain killer injection 30mg 10mg')
    if any(x in upper for x in ['KINZ', 'NALBUPHINE', 'NALBIN']):
        synonyms.append('kinz nalbuphine sami opioid analgesic 10mg 20mg ampoule')
    if any(x in upper for x in ['DECADRON', 'DEXAMETHASONE', 'DEXA']):
        synonyms.append('decadron dexa dexamethasone steroid anti-inflammatory 4mg 8mg')
    if any(x in upper for x in ['SOLU-CORTEF', 'SOLUCORTEF', 'HYDROCORTISONE']):
        synonyms.append('solu-cortef solucortef solu cortef hydrocortisone pfizer steroid 100mg 250mg 500mg vial')
    if any(x in upper for x in ['SOLU-MEDROL', 'SOLUMEDROL', 'METHYLPREDNISOLONE', 'MEDROL']):
        synonyms.append('solu-medrol solumedrol solu medrol methylprednisolone pfizer steroid 40mg 125mg 500mg 1000mg')
    if any(x in upper for x in ['LASIX', 'FUROSEMIDE']):
        synonyms.append('lasix furosemide sanofi loop diuretic edema water retention 20mg 40mg')
    if any(x in upper for x in ['PYODINE', 'POVIDONE', 'IODINE']):
        synonyms.append('pyodine povidone iodine antiseptic surgical scrub solution ointment 60ml 120ml 450ml wound wash burn')
    if any(x in upper for x in ['XYLOCAINE', 'LIGNOCAINE', 'LIDOCAINE']):
        synonyms.append('xylocaine lignocaine lidocaine astrazeneca local anesthesia spinal 2% spray jelly injection')
    if any(x in upper for x in ['CLEXANE', 'ENOXAPARIN', 'HEPARIN']):
        synonyms.append('clexane enoxaparin heparin sanofi anticoagulant blood thinner dvt 20mg 40mg 60mg 80mg')
    if any(x in upper for x in ['INSULIN', 'HUMALOG', 'LANTUS', 'MIXTARD', 'ACTRAPID', '70/30']):
        synonyms.append('insulin humalog lantus mixtard actrapid diabetes diabetic blood sugar pen vial cartridge')
    if any(x in upper for x in ['LIPITOR', 'ATORVASTATIN', 'LIPIGET']):
        synonyms.append('lipitor lipiget atorvastatin pfizer getz cholesterol statin 10mg 20mg 40mg')
    if any(x in upper for x in ['GLUCOPHAGE', 'METFORMIN']):
        synonyms.append('glucophage metformin merck diabetes blood sugar 500mg 850mg 1000mg')
    if any(x in upper for x in ['SALINE', 'SODIUM CHLORIDE', 'N/S', 'NORMAL SALINE']):
        synonyms.append('saline normal saline 0.9% sodium chloride otsuka unisol medisol fdl infusion drip')
    if any(x in upper for x in ['DEXTROSE', 'D5W', 'D10W', 'D25W', 'DNS']):
        synonyms.append('dextrose glucose 5% 10% 25% infusion drip otsuka medisol water sugar')
    if any(x in upper for x in ['RINGER', 'HARTMANN', 'ELECTROLYTE']):
        synonyms.append('ringer lactate hartmann solution r/l electrolyte infusion otsuka medisol')
    if any(x in upper for x in ['WATER FOR INJECTION', 'STERILE WATER', 'WFI']):
        synonyms.append('water for injection sterile water wfi otsuka zafa ampoule solvent')

    # Build clean search index string
    # Remove excessive punctuation so search queries like "i.v. set" or "accu-chek" or "500 mg" match
    clean_text = f"{name_clean} {name} {code} {company} {unit} {category_tag} {' '.join(synonyms)}"
    # Normalize punctuation into spaces as well
    punct_spaced = re.sub(r'[^a-zA-Z0-9]+', ' ', clean_text)
    
    full_index = f"{clean_text} {punct_spaced}".lower()
    # Deduplicate repeated words to keep JSON compact
    words = full_index.split()
    seen = set()
    unique_words = []
    for w in words:
        if w not in seen:
            seen.add(w)
            unique_words.append(w)
            
    search_index = " ".join(unique_words)
    
    is_surgical = category_tag in ['Surgical & Disposable', 'Diagnostic & Equipment']
    is_medicine = not is_surgical

    return search_index, is_medicine, name_clean

# Parse all lines from raw CSV
with open(raw_csv_path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

products = []
full_text = "".join(lines)
reader = csv.reader(full_text.splitlines())

for row in reader:
    if not row or not any(row):
        continue
    first_col = row[0].strip().replace('"', '')
    if not first_col.isdigit():
        continue
    
    item_id = int(first_col)
    code = row[1].strip() if len(row) > 1 else ""
    raw_name = row[2].strip() if len(row) > 2 else ""
    company = row[3].strip() if len(row) > 3 and row[3].strip() else 'General Supply'
    unit = row[4].strip() if len(row) > 4 and row[4].strip() else 'UNIT'

    category_tag = derive_category(raw_name, unit)
    search_index, is_medicine, clean_name = compute_search_index(raw_name, code, company, unit, category_tag)

    products.append({
        "id": item_id,
        "code": code,
        "name": clean_name if clean_name else raw_name,
        "rawName": raw_name,
        "company": company,
        "unit": unit,
        "categoryTag": category_tag,
        "isMedicine": is_medicine,
        "searchIndex": search_index
    })

print(f"Total parsed products: {len(products)}")
with open(output_json_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, separators=(',', ':'))

print(f"Written {len(products)} to {output_json_path}")
