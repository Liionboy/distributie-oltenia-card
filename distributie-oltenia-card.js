class DistributieOlteniaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this._config = null;
  }

  setConfig(config) {
    this._config = config;
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    var consumptionSensor = null;
    var productionSensor = null;
    var pricePerKwh = 1.2;
    
    if (this._config) {
      consumptionSensor = this._config.consumption_sensor || null;
      productionSensor = this._config.production_sensor || null;
      pricePerKwh = this._config.price_per_kwh || 1.2;
    }
    
    var values = { consumption: '--', production: '--', savings: '--', meter: '--', date: '--' };
    
    if (this._hass && this._hass.states && consumptionSensor && productionSensor) {
      var states = this._hass.states;
      
      var consumptionState = states[consumptionSensor];
      if (consumptionState) {
        var cattrs = consumptionState.attributes || {};
        values.consumption = cattrs.consumption || consumptionState.state || '0';
        values.meter = cattrs.meter_serial || '--';
        values.date = cattrs.reading_date || '--';
      }
      
      var productionState = states[productionSensor];
      if (productionState) {
        var pattrs = productionState.attributes || {};
        values.production = pattrs.returned || '0';
      }
      
      var consVal = parseFloat(values.consumption);
      if (!isNaN(consVal)) {
        values.savings = '~' + (consVal * pricePerKwh).toFixed(2) + ' Lei';
      }
    }

    this.shadowRoot.innerHTML = '<div class="card" style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); border-radius: 16px; padding: 20px; color: white; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">' +
      '<div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">' +
        '<span style="font-size: 18px; font-weight: 600;">⚡ Distribuție Oltenia</span>' +
        '<span style="font-size: 11px; opacity: 0.7; background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 8px;">Citire DEO</span>' +
      '</div>' +
      '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">' +
        '<div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; text-align: center;">' +
          '<div style="font-size: 24px;">📊</div>' +
          '<div style="font-size: 12px; opacity: 0.8;">Consum</div>' +
          '<div style="font-size: 20px; font-weight: 700;">' + values.consumption + '</div>' +
          '<div style="font-size: 12px; opacity: 0.7;">kWh</div>' +
        '</div>' +
        '<div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; text-align: center;">' +
          '<div style="font-size: 24px;">☀️</div>' +
          '<div style="font-size: 12px; opacity: 0.8;">Producție</div>' +
          '<div style="font-size: 20px; font-weight: 700;">' + values.production + '</div>' +
          '<div style="font-size: 12px; opacity: 0.7;">kWh</div>' +
        '</div>' +
        '<div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; text-align: center;">' +
          '<div style="font-size: 24px;">💰</div>' +
          '<div style="font-size: 12px; opacity: 0.8;">Cost</div>' +
          '<div style="font-size: 20px; font-weight: 700;">' + values.savings + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; font-size: 11px; opacity: 0.6; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">' +
        '<span>Contor: ' + values.meter + '</span>' +
        '<span>Data: ' + values.date + '</span>' +
      '</div>' +
    '</div>';
  }
}

customElements.define('distributie-oltenia-card', DistributieOlteniaCard);
