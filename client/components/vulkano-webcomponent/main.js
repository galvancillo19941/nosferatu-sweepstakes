/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { html, LitElement } from 'lit';

import styles from './styles.scss';

export class VulkanoWebcomponent extends LitElement {

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = '';
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.constructor.stylesheet = sheet;
  }

  firstUpdated() {

    let shoelace_basepath = '/vendors/shoelace';

    if (window.location.hostname.includes('localhost')) {
      shoelace_basepath = '/vendors/shoelace';
    }

    // css

    const shoelacecss = document.createElement('link');
    shoelacecss.rel = 'stylesheet';
    shoelacecss.href = `${shoelace_basepath}/themes/light.css`;
    document.head.appendChild(shoelacecss);

    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    // Aplica los estilos al Shadow DOM
    this.shadowRoot.adoptedStyleSheets = [this.constructor.stylesheet];
  }

  render() {
    return html`
      <div class="bg-nosferatu">

      <h2>Please Enter Your Details</h2>

        <form action="">

        <sl-input label="Your name (as it appears on your ID)"></sl-input>
        <sl-input label="Your email address"></sl-input>

        <div class="contain-select">
          <sl-select>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
          <sl-select>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
          <sl-select>
            <sl-option value="option-1">Option 1</sl-option>
            <sl-option value="option-2">Option 2</sl-option>
            <sl-option value="option-3">Option 3</sl-option>
          </sl-select>
        </div>


        <sl-checkbox>I agree to the theater’s terms and conditions</sl-checkbox>

        <sl-button>Button</sl-button>

        </form>
      </div>
    `;
  }
}

customElements.define('vulkano-webcomponent', VulkanoWebcomponent);
