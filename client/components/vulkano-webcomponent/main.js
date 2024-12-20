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
      month: '',
      check: false
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

    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = '/css/fonts.css';
    document.head.appendChild(fonts);

    const fontsPoppins = document.createElement('link');
    fontsPoppins.rel = 'stylesheet';
    fontsPoppins.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"';
    document.head.appendChild(fontsPoppins);

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

    const requiredFields = ['your_name'];
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

  handleDateValidations() {
    const nameError = this.shadowRoot.querySelector('#name-error-date');
    const requiredFields = ['day', 'month', 'year'];

    console.log('aqio');

    let validate = false;

    requiredFields.forEach((fieldName) => {
      const field = this.shadowRoot.querySelector(`[name="${fieldName}"]`);

      if (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      }
    });

    if (this.datos.day !== '' && this.datos.month !== '' && this.datos.year !== '') {
      validate = true;
    }

    if (!validate) {
      nameError.hidden = false;
    } else {
      nameError.hidden = true;
      this.validateEmailStatus = true;
    }

  }

  handleCheck(e) {

    this.datos.check = e.target.checked;

    this.handleValidateCheck();

  }

  handleValidateCheck() {
    const field = this.shadowRoot.querySelector('[name="check"]');

    let validate = false;

    if (this.datos.check) {
      validate = true;
    }

    if (!validate) {
      field.classList.add('error-check');
    } else {
      field.classList.remove('error-check');
    }
  }

  handlesubmit() {
    this.validateAllFields();
    this.validateEmail();
    this.handleDateValidations();
    this.handleValidateCheck();

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
          <div id="name-error-your_name" aria-live="polite" class="name-error" hidden>Please enter your name</div>
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
          <div id="name-error-email" aria-live="polite" class="name-error" hidden>Please enter your email address</div>
        </div>


        <div class="contain-select">

          <label for="">Your birth date</label>

          <div class="column">
            <div class="contain-input">

                <sl-select
                    name="day"
                    @sl-change=${this.onChange}
                    @blur=${this.handleDateValidations}
                    @input=${this.handleDateValidations}
                    placeholder="Day"
                    class="select-style">
                    ${this.Day.map((i) => html`
                        <sl-option value="${i.day}">${i.day}</sl-option>
                    ` )}
                </sl-select>
                <div id="name-error-date" aria-live="polite" class="name-error" hidden>Please enter your date</div>
            </div>

            <div class="contain-input">
              <sl-select
                  name="month"
                  @sl-change=${this.onChange}
                  placeholder="Month"
                  class="select-style">
                ${this.Month.map((i) => html`
                    <sl-option value="${i.month}">${i.month}</sl-option>
                ` )}
              </sl-select>
            </div>

            <div class="contain-input">
              <sl-select
                  name="year"
                  @sl-change=${this.onChange}
                  placeholder="Year"
                  class="select-style">
                ${this.Years.map((i) => html`
                    <sl-option value="${i.year}">${i.year}</sl-option>
                ` )}
              </sl-select>

            </div>
          </div>

        </div>

        <sl-checkbox class="check" name="check" @sl-change=${this.handleCheck}>
            I AGREE THAT NBCUNIVERSAL AND ITS AFFILIATES, INCLUDING FOCUS INSIDER AND UNIVERSAL LOYALTY, MAY SEND ME THE LATEST NEWS, PROMOTIONS AND MORE. I WANT TO RECEIVE INFORMATION FROM FOCUS FEATURES.
        </sl-checkbox>

        <br>

        <sl-button class="btn-next" @click=${this.handlesubmit}>Next</sl-button>

        </form>
      </div>
    `;
  }
}

customElements.define('vulkano-webcomponent', VulkanoWebcomponent);
