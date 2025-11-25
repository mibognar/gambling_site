import csv
import json
import re
from pathlib import Path

def csv_to_json(csv_path, json_path):
    data = {}

    with open(csv_path, 'r', encoding='utf-8') as f:
        sample = f.read(2048)
        dialect = csv.Sniffer().sniff(sample, delimiters=',;')
        f.seek(0)
        reader = csv.DictReader(f, dialect=dialect)

        field_map = {k.lower(): k for k in reader.fieldnames}

        for row in reader:
            # --- SPORT & INFO ---
            sl_field = field_map.get("sports_and_league") or field_map.get("sport_and_league")
            raw_sl = row.get(sl_field, "").strip() if sl_field else ""

            sport = ""
            info = ""
            if "," in raw_sl:
                parts = raw_sl.split(",", 1)
                sport = parts[0].strip()
                info = parts[1].strip()
            else:
                sport = raw_sl.strip()

            if not sport:
                sport = "Unknown"

            if sport not in data:
                data[sport] = []

            # --- PARTICIPANTS ---
            part_field = field_map.get("participants") or field_map.get("teams")
            participants = row.get(part_field, "").split(" - ") if part_field else []
            hazai = participants[0].strip() if len(participants) > 0 else ""
            vendeg = participants[1].strip() if len(participants) > 1 else ""

            # --- DATE ---
            date_field = field_map.get("date_time") or field_map.get("date")
            date_value = row.get(date_field, "").strip() if date_field else ""
            if date_value:
                info = f"{info} | {date_value}" if info else date_value

            # --- ODDS HANDLING ---
            odds_field = field_map.get("odds") or field_map.get("odd")
            odds_str = row.get(odds_field, "") if odds_field else ""

            cleaned = (
                odds_str.replace("[", "")
                .replace("]", "")
                .replace("'", "")
                .replace('"', "")
                .strip()
            )

            # Convert decimal commas (1,75 -> 1.75)
            cleaned = re.sub(r'(\d),(\d)', r'\1.\2', cleaned)

            # Split by commas
            parts = [x.strip() for x in cleaned.split(",") if x.strip()]

            def to_float_safe(x):
                try:
                    return float(x)
                except Exception:
                    return None

            odds_hazai = odds_dontetlen = odds_vendeg = None
            if len(parts) >= 1:
                odds_hazai = to_float_safe(parts[0])
            if len(parts) == 2:
                odds_vendeg = to_float_safe(parts[1])
            elif len(parts) >= 3:
                odds_dontetlen = to_float_safe(parts[1])
                odds_vendeg = to_float_safe(parts[2])

            # --- MATCH OBJECT (omit None odds) ---
            match = {
                "info": info,
                "hazai": hazai,
                "vendég": vendeg,
            }

            if odds_hazai is not None:
                match["odds_hazai"] = odds_hazai
            if odds_dontetlen is not None:
                match["odds_döntetlen"] = odds_dontetlen
            if odds_vendeg is not None:
                match["odds_vendég"] = odds_vendeg

            data[sport].append(match)

    # --- WRITE JSON ---
    with open(json_path, "w", encoding="utf-8") as jsonfile:
        json.dump(data, jsonfile, indent=4, ensure_ascii=False)

    print(f"✅ JSON file created at: {json_path}")


if __name__ == "__main__":
    input_csv = Path("tippmix_odds.csv")
    output_json = Path("tippmix_odds.json")
    csv_to_json(input_csv, output_json)

