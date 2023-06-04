export function input({
    label,
    id,
    name,
    placeholder = "",
    type,
    required = false,
    value = false,
  }) {
    return `
      <div class="input">
        ${
          label
            ? `<label for="${id}" class="content-xs overline" >${label}</label>`
            : ""
        }
       
        <div class="input__container">
          <input
            type="${type ? type : "text"}"
            placeholder="${placeholder}"
            class="input__content"
            id="${id}"
            name="${name ? name : id}"
            ${value ? `value="${value}"` : ""}
            ${required ? "required" : ""}
          >
        </div>
      </div>
    `;
  }
  
  export function selectInput({
    label,
    id,
    name,
    options,
    required = false,
    value = "",
  }) {
    console.log(value)
    const optionsHTML = options
      ? options
          .map((option) => `<option value="${option}" ${option === value ? "selected": ""} >${option}</option>`)
          .join("")
      : "";
  
    return `
      <div class="input">
        ${
          label
            ? `<label for="${id}" class="content-xs overline">${label}</label>`
            : ""
        }
       
        <div class="input__container">
          <select
            class="input__content"
            id="${id}"
            name="${name ? name : id}"
            ${required ? "required" : ""}
          >
            
            ${optionsHTML}
          </select>
        </div>
      </div>`
    ;
  }