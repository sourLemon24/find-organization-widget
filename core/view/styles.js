import { FIELD_WIDTH } from "../helpers.js"

export const addStyles = (widget) => {
  const style = document.createElement('style')
  style.innerText = `* {
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  body {
    display: flex;
    justify-content: center;
    background: #fafafa;
  }
  
  .widget-wrapper {
    box-sizing: content-box;
    width: ${FIELD_WIDTH};
    padding: 20px; 
    background-color: bisque;
    border-radius: 3px;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.05);
  }

  .text-field__label {
    display: block;
    margin-bottom: 3px;
    padding-left: 3px;
  }
  
  .text-field__input { 
    display: block;
    margin-bottom: 10px;
    width: inherit;
    height: 32px;
    padding: 0 5px;
    background: #fff;
    border: none;
    outline: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    font-size: 14px;
  }
  
  .text-field__input input[type="text"] {
    cursor: default;
  }
  
  .suggestions-list {
    position: absolute;
    display: block;
    margin-top: -10px;
    width: inherit;
    padding-left: 0px;
    list-style: none;
    background-color: aliceblue;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.05);
  }
  
  .error-field {
    height: 18px;
    width: inherit;
    padding-left: 3px;
    color: red;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .suggestions-list-item {
    width: inherit;
    padding: 8px 10px; 
    font-size: 14px;
  }
  
  .suggestions-list-item:hover {
    background: #62baea;
    color: #fff;
  }
  
  .suggestions-list-item:hover:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }`
  widget.prepend(style)
}