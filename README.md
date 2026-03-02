# Distribuție Oltenia Card

Custom card for Home Assistant to display energy data from Distribuție Oltenia integration.

![HACS](https://img.shields.io/badge/HACS-Default-orange.svg)

## Installation

### Via HACS (recommended)

1. Open HACS → Integrations
2. Click the 3 dots (⋮) → Custom repositories
3. Add: `https://github.com/Liionboy/distributie-oltenia-card`
4. Category: **Lovelace**
5. Click the + button and search for "Distribuție Oltenia Card"
6. Install

### Manual

1. Copy `distributie-oltenia-card.js` to `/config/www/distributie-oltenia-card/`
2. Add resource in Home Assistant:
   - Settings → Dashboards → Resources
   - Add Resource: `/local/distributie-oltenia-card/distributie-oltenia-card.js`
   - Type: JavaScript Module

## Configuration

Add the card to your dashboard:

```yaml
type: custom:distributie-oltenia-card
consumption_sensor: sensor.your_consumption_sensor
production_sensor: sensor.your_production_sensor
price_per_kwh: 0.96
```

### Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `consumption_sensor` | string | Yes | - | Entity ID for consumption sensor |
| `production_sensor` | string | Yes | - | Entity ID for production sensor |
| `price_per_kwh` | float | No | 0.96 | Price per kWh in RON |

## Features

- 📊 Displays current consumption
- ☀️ Shows production/returned energy
- 💰 Calculates estimated cost
- 📅 Shows last reading date
- 🔢 Displays meter serial number

## Example

```yaml
type: custom:distributie-oltenia-card
consumption_sensor: sensor.deo_energie_activa_XXXXXX
production_sensor: sensor.deo_productie_activa_XXXXX
price_per_kwh: 0.96
```

## Credits

- Created for Home Assistant community
- Compatible with [distributie-oltenia](https://github.com/Liionboy/distributie-oltenia) integration

---

⭐ If you like this card, please give it a star on GitHub!
