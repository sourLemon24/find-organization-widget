import { createWidget } from "./core/view/view.js"

class findOrganizationWidget extends HTMLElement {
  connectedCallback () {
    const token = this.getAttribute('token') || null
    const widget = createWidget(token)
    this.attachShadow({mode: 'open'});
    this.shadowRoot.prepend(widget)
  }
}
customElements.define("find-organization-widget", findOrganizationWidget)
