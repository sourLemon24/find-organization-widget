import { createWidget, getViewElements } from "./core/view.js"
import { setElements } from "./core/model.js"
import { debounceHandler } from "./core/controller.js"

class findOrganizationWidget extends HTMLElement {
  connectedCallback () {
    const token = this.getAttribute('token') || null
    const widget = createWidget(debounceHandler, token)
    document.body.prepend(widget)
    setElements(getViewElements())
  }
}
customElements.define("find-organization-widget", findOrganizationWidget)
