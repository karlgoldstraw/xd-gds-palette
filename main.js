
const { alert, error } = require("./lib/dialogs.js");
var {Rectangle, Color} = require("scenegraph");

const lorem1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu dui rutrum, congue velit a, auctor nulla. Aenean lacinia."
const lorem2 = "Aenean lacinia, leo quis tempus dapibus, sapien lacus efficitur mauris, et tristique eros tortor et mauris. Vivamus nec tellus condimentum, fermentum enim eget, eleifend velit."
const lorem3 = "Ut volutpat nulla ac egestas lobortis. Leo quis tempus dapibus."

const colours =[
    ["$govuk-text-colour", '#0b0c0c'],
    ["$govuk-secondary-text-colour", '#6f777b'],
    ["$govuk-link-colour", '#005ea5'],
    ["$govuk-link-hover-colour", '#2b8cc4'],
    ["$govuk-link-visited-colour", '#4c2c92'],
    ["$govuk-link-active-colour", '#2b8cc4'],
    ["$govuk-focus-colour", '#ffbf47'],
    ["$govuk-focus-text-colour", '#0b0c0c'],
    ["$govuk-error-colour", '#b10e1e'],
    ["$govuk-brand-colour", '#005ea5']
];

const palette =[
    ["white", '#ffffff'],
    ["grey-4", '#f8f8f8'],
    ["grey-3", '#dee0e2'],
    ["grey-2", '#bfc1c3'],
    ["grey-1", '#6f777b'],
    ["black", '#0b0c0c'],
    ["blue", '#005ea5'],
    ["light-blue", '#2b8cc4'],
    ["turquoise", '#28a197'],
    ["green", '#006435'],
    ["green (button)", '#00823b'],
    ["light-green", '#85994b'],
    ["yellow", '#ffbf47'],
    ["brown", '#b58840'],
    ["orange", '#f47738'],
    ["bright-red", '#df3034'],
    ["red", '#b10e1e'],
    ["light-pink", '#f499be'],
    ["pink", '#d53880'],
    ["bright-purple", '#912b88'],
    ["light-purple", '#6f72af'],
    ["purple", '#2e358b'],
    ["purple (visited link)", '#4c2c92']
];

function addPalette() {
    var i = 0;
    /*var len = colours.length;
    for (i=0; i<len; i++){
        addColor(colours[i])
    }*/
    palette.reverse();
    var len = palette.length;
    for (i=0; i<len; i++){
        addColor(palette[i])
    }
}



function addColor(array) {
    console.log(array);
    var assets = require("assets");
    var label = array[0] + ' ('+array[1]+')';
    var color = new Color(array[1]);
    assets.colors.add([
        { name: label, color: color }
    ]);

}

/**
* Shorthand for creating Elements.
* @param {*} tag The tag name of the element.
* @param {*} [props] Optional props.
* @param {*} children Child elements or strings
*/
function h(tag, props, ...children) {
    let element = document.createElement(tag);
    if (props) {
        if (props.nodeType || typeof props !== "object") {
            children.unshift(props);
        }
        else {
            for (let name in props) {
                let value = props[name];
                if (name == "style") {
                    Object.assign(element.style, value);
                }
                else {
                    element.setAttribute(name, value);
                    element[name] = value;
                }
            }
        }
    }
    for (let child of children) {
        element.appendChild(typeof child === "object" ? child : document.createTextNode(child));
    }
    return element;
}



let dialog =
    h("dialog",
        h("form", { method:"dialog", style: { width: 400 } },
            h("h1", "H1 Heading, Large Rule, Large Paragraph"),
            h("hr", { class:"large" } ),
            h("p", { class:"large", style:{ lineHeight: 20 }}, lorem1),
            h("p", { class:"large"}, lorem3),
            h("h2", "H2 Heading, Normal Rule, Normal Paragraph"),
            h("hr"),
            h("p", lorem1),
            h("p", lorem3),
            h("h3", "H3 Heading, Small Rule, Small Paragraph"),
            h("hr", { class:"small" } ),
            h("p", { class:"small"}, lorem1),
            h("p", { class:"small"}, lorem3),
            h("footer",
                h("button", { uxpVariant: "primary", onclick(e) { dialog.close() } }, "Cancel"),
                h("button", { uxpVariant: "cta", onclick(e) { dialog.close() } }, "Submit")
            )
        )
    )
document.body.appendChild(dialog);
async function showAlert() {
    /* we'll display a dialog here */
    await alert("Connect to the Internet", //[1]
    "In order to function correctly, this plugin requires access to the Internet. Please connect to a network that has Internet access."); //[2]
}

async function showError() {
    /* we'll display a dialog here */
    await error("Synchronization Failed", //[1]
    "Failed to synchronize all your changes with our server. Some changes may have been lost.",
    "Steps you can take:",
    "* Save your document",
    "* Check your network connection",
    "* Try again in a few minutes"); //[2]
}

function myPluginCommand(selection) {
    // Go to Plugins > Development > Developer Console to see this log output
    console.log("Plugin command is running!");

    // Insert a red square at (0, 0) in the current artboard or group/container
    var shape = new Rectangle();
    shape.width = 100;
    shape.height = 100;
    shape.fill = new Color("#f00");
    selection.insertionParent.addChild(shape);
}

module.exports = {
    commands: {
        myPluginCommand: myPluginCommand,
        showAlert,
        showError,
        menuCommand: function () {
            dialog.showModal();
        },
        addPalette
    }
};
