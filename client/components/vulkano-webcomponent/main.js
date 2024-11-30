/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { html, LitElement } from 'lit';

import styles from './styles.scss';

export class VulkanoWebcomponent extends LitElement {

  static properties = {
    name: { type: String },
    Day: { type: Array },
    Month: { type: Array },
    Years: { type: Array },
    datos: { type: Object }
  };

  constructor() {
    super();
    this.name = '';
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(styles);
    this.constructor.stylesheet = sheet;
    this.Day = [];
    this.Month = [
      {
        month: 'January'
      },
      {
        month: 'February'
      },
      {
        month: 'March'
      },
      {
        month: 'April'
      },
      {
        month: 'May'
      },
      {
        month: 'June'
      },
      {
        month: 'July'
      },
      {
        month: 'August'
      },
      {
        month: 'September'
      },
      {
        month: 'October'
      },
      {
        month: 'November'
      },
      {
        month: 'December'
      },
    ];
    this.Years = [];
    this.datos = {
      your_name: '',
      email: '',
      day: '',
      month: ''
    };
    this.fieldWithBlur = null;
  }

  firstUpdated() {

    let shoelace_basepath = '/vendors/shoelace';

    if (window.location.hostname.includes('localhost')) {
      shoelace_basepath = '/vendors/shoelace';
    }

    const shoelacecss = document.createElement('link');
    shoelacecss.rel = 'stylesheet';
    shoelacecss.href = `${shoelace_basepath}/themes/light.css`;
    document.head.appendChild(shoelacecss);

    for (let i = 1; i <= 31; i++) {
      this.Day.push({ day: i });
    }

    for (let year = 1950; year <= 2024; year++) {
      this.Years.push({ year });
    }

    this.requestUpdate();

  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.adoptedStyleSheets = [this.constructor.stylesheet];
  }

  onChange(e) {

    this.datos = {
      ...this.datos,
      [e.target.name]: e.target.value
    };

    // this.validationsRequiredFields();

    if (this.fieldWithBlur) {
      this.validationErrorFields(this.fieldWithBlur);
    }

    this.requestUpdate();

  }

  onBlur(fieldName) {
    this.fieldWithBlur = fieldName;
  }

  onInput(fieldName) {
    this.fieldWithBlur = fieldName;
    this.validationErrorFields(fieldName);
  }

  validateAllFields() {

    const requiredFields = ['your_name', 'day', 'month', 'year'];
    requiredFields.forEach((fieldName) => {
      this.validationErrorFields(fieldName);
    });
  }

  validationErrorFields(fieldName) {

    const field = this.shadowRoot.querySelector(`[name="${fieldName}"]`);
    const nameError = this.shadowRoot.querySelector(`#name-error-${fieldName}`);

    if (field) {
      if (!field.value.trim()) {
        nameError.hidden = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
        nameError.hidden = true;
      }
    }
  }

  validateEmail(e) {
    const nameError = this.shadowRoot.querySelector('#name-error-email');
    const field = this.shadowRoot.querySelector('[name="email"]');
    const regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,62}[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9.-]{0,253}[a-zA-Z0-9]\.[a-zA-Z]{2,4}$/;

    let validate = false;

    const emailData = e === undefined ? this.datos.email : e.target.value;

    if (regexEmail.test(emailData)) {
      validate = true;
    }

    if (!validate) {
      nameError.hidden = false;
      field.classList.add('error');
    } else {
      nameError.hidden = true;
      field.classList.remove('error');
      this.validateEmailStatus = true;
    }

  }

  handlesubmit() {
    this.validateAllFields();
    this.validateEmail();
    console.log('datos', this.datos);
  }

  render() {

    return html`
      <div class="bg-nosferatu">

      <h2>Please Enter Your Details</h2>

        <form action="">

        <div class="contain-input">
          <sl-input
            autocomplete="off"
            name="your_name"
            @blur=${(e) => this.onBlur(e.target.name)}
            @input=${() => this.onInput('your_name')}
            @sl-change=${this.onChange}
            placeholder="Name"
            class="input-style">
            <span slot="label"> Your name${html`<span style="color: #7d7a7a"> (as it appears on your ID)</span>`}</span>
          </sl-input>
          <div id="name-error-your_name" aria-live="polite" class="name-error" hidden>error name</div>
        </div>

        <div class="contain-input">
          <sl-input

            name="email"
            @sl-change=${this.onChange}
            @keyup=${(e) => this.validateEmail(e)}
            @input=${(e) => this.validateEmail(e)}
            label="Your email address"
            placeholder="Email"
            class="input-style">
          </sl-input>
          <div id="name-error-email" aria-live="polite" class="name-error" hidden>error email</div>
        </div>


        <div class="contain-select">

          <label for="">Your birth date</label>

          <div class="column">
            <div class="contain-input">
                <sl-select
                    name="day"
                    @blur=${(e) => this.onBlur(e.target.name)}
                    @input=${() => this.onInput('day')}
                    @sl-change=${this.onChange}
                    placeholder="Day"
                    class="select-style">
                    ${this.Day.map((i) => html`
                        <sl-option value="${i.day}">${i.day}</sl-option>
                    ` )}
                </sl-select>
                <div id="name-error-day" aria-live="polite" class="name-error" hidden>error day</div>
            </div>

            <div class="contain-input">
              <sl-select
                  name="month"
                  @blur=${(e) => this.onBlur(e.target.name)}
                  @input=${() => this.onInput('month')}
                  @sl-change=${this.onChange}
                  placeholder="Month"
                  class="select-style">
                ${this.Month.map((i) => html`
                    <sl-option value="${i.month}">${i.month}</sl-option>
                ` )}
              </sl-select>
              <div id="name-error-month" aria-live="polite" class="name-error" hidden>error month</div>
            </div>

            <div class="contain-input">
              <sl-select
                  name="year"
                  @blur=${(e) => this.onBlur(e.target.name)}
                  @input=${() => this.onInput('year')}
                  @sl-change=${this.onChange}
                  placeholder="Year"
                  class="select-style">
                ${this.Years.map((i) => html`
                    <sl-option value="${i.year}">${i.year}</sl-option>
                ` )}
              </sl-select>
              <div id="name-error-year" aria-live="polite" class="name-error" hidden>error year</div>
            </div>
          </div>

        </div>

        <sl-checkbox class="check">
            I AGREE THAT NBCUNIVERSAL AND ITS AFFILIATES, INCLUDING FOCUS INSIDER AND UNIVERSAL LOYALTY, MAY SEND ME THE LATEST NEWS, PROMOTIONS AND MORE. I WANT TO RECEIVE INFORMATION FROM FOCUS FEATURES.
        </sl-checkbox>

        <br>

        <sl-button class="btn-next" @click=${this.handlesubmit}>Button</sl-button>

        </form>
      </div>
    `;
  }
}

customElements.define('vulkano-webcomponent', VulkanoWebcomponent);
