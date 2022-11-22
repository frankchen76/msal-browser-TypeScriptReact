import { Label } from "@fluentui/react";
import { clone } from "lodash";
import { Sources, Delta } from "quill";
import * as React from "react";
// import * as Quill from "quill";
import { Control, useController } from "react-hook-form";
import ReactQuill, { Quill } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import "../styles/main.css";

// var BlockEmbed = Quill.import('blots/block/embed');

// // Create a new format based off the BlockEmbed.
// class Footer extends BlockEmbed {

//     // Handle the creation of the new Footer format.
//     // The value will be the HTML that is embedded.
//     // This time the value is passed from our custom handler.
//     static create(value) {

//         // Create the node using the BlockEmbed's create method.
//         var node = super.create(value);

//         // Set the srcdoc attribute to equal the value which will be your html.
//         node.setAttribute('srcdoc', value);

//         // Add a few other iframe fixes.
//         node.setAttribute('frameborder', '0');
//         node.setAttribute('allowfullscreen', true);
//         node.setAttribute('width', '100%');
//         return node;
//     }

//     // return the srcdoc attribute to represent the Footer's value in quill.
//     static value(node) {
//         return node.getAttribute('srcdoc');
//     }

// }

// // Give our new Footer format a name to use in the toolbar.
// Footer.blotName = 'footer';

// // Give it a class name to edit the css.
// Footer.className = 'ql-footer';

// // Give it a tagName of iframe to tell quill what kind of element to create.
// Footer.tagName = 'iframe';

// // Register the new Footer format so we can use it in our editor.
// //Quill.register(Footer, true);
// Quill.register("formats/footer", Footer);

// // Specify the HTML that will be embedded.
// var footerHTML = '<h1>Footer</h1>'
//     + '<p>This is our new footer</p>';

// // Create the footer handler.
// var footerHandler = function () {

//     // Get the cursor location to know where footer will be added.
//     var index = this.quill.getSelection(true).index;

//     // Insert the footer with the footerHTML.
//     this.quill.insertEmbed(index, 'footer', footerHTML);
// };
function insertStar() {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "★");
    // const value = `<p>test</p>`;
    // const delta = this.quill.clipboard.convert(value);

    // this.quill.setContents(delta, 'silent');
    // //this.quill.container.firstChild.innerHTML = value;
    this.quill.setSelection(cursorPosition + 1);
}

// Import the Toolbar module so we can add a custom handler to our footer button.
// var Toolbar = Quill.import('modules/toolbar');

// // Add our custom footer handler to the footer button.
// Toolbar.DEFAULTS.handlers['footer'] = footerHandler;

export interface IRichtextEditor1Props {
    label: string;
    desc: string;
    control: Control<any>;
    name: string;
}

export const RichtextEditor1 = (props: IRichtextEditor1Props) => {
    const { field } = useController({
        control: props.control,
        name: props.name
    });
    const [value, setValue] = React.useState(field.value || "");

    const onEditorChange = (content: string,
        delta: Delta,
        source: Sources,
        editor: any) => {
        const newValue = content;
        console.log("newValue", newValue);
        setValue(newValue);
        field.onChange(newValue);
    };

    const modules = {
        // toolbar: [
        //     [{ 'header': [1, 2, false] }],
        //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        //     ['link', 'image'],
        //     ['clean'],
        //     ['footer']
        // ],
        toolbar: {
            container: '#toolbar',  // Selector for toolbar container
            handlers: {
                'footer': insertStar
            }
        },
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    const CustomButton = () => <span className="ms-Icon ms-Icon--PinSolid12" />;
    const CustomToolbar = () => (
        <div id="toolbar">
            <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                <option value="1" />
                <option value="2" />
                <option selected />
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <select className="ql-color">
                <option value="red" />
                <option value="green" />
                <option value="blue" />
                <option value="orange" />
                <option value="violet" />
                <option value="#d0d1d2" />
                <option selected />
            </select>
            <button className="ql-footer">
                <CustomButton />
            </button>
        </div>
    );

    return (
        <div className="richtexteditor2 text-editor">
            <Label>{props.label}</Label>
            <CustomToolbar />
            <ReactQuill
                onChange={onEditorChange}
                //onBlur={onQuillDescriptionBlur}
                className="myQuill"
                modules={modules}
                formats={formats}
                theme={"snow"} />
        </div>

    );
};
export interface IRichtextEditor2Props {
    label: string;
    desc: string;
};

export const RichtextEditor2 = (props: IRichtextEditor2Props) => {
    const [txtContent, setTxtContent] = React.useState(props.desc);

    const onEditorChange = (content: string,
        delta: Delta,
        source: Sources,
        editor: any) => {
        //const newValue = content;
        const newValue = editor.getContents();
        console.log("newValue:", newValue);
        setTxtContent(newValue);
    };
    const onEditorChange1 = (content: string) => {
        const newValue = clone(content);
        console.log("newValue:", newValue);
        setTxtContent(newValue);
    };


    const modules = {
        // toolbar: [
        //     [{ 'header': [1, 2, false] }],
        //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        //     ['link', 'image'],
        //     ['clean'],
        //     ['footer']
        // ],
        toolbar: {
            container: '#toolbar',  // Selector for toolbar container
            handlers: {
                'footer': insertStar
            }
        },
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];
    const CustomButton = () => <span className="ms-Icon ms-Icon--PinSolid12" />;
    const CustomToolbar = () => (
        <div id="toolbar">
            <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                <option value="1" />
                <option value="2" />
                <option selected />
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <select className="ql-color">
                <option value="red" />
                <option value="green" />
                <option value="blue" />
                <option value="orange" />
                <option value="violet" />
                <option value="#d0d1d2" />
                <option selected />
            </select>
            {/* <button className="ql-footer">
                <CustomButton />
            </button> */}
        </div>
    );

    return (
        <div className="richtexteditor2 text-editor">
            <Label>{props.label}</Label>
            <CustomToolbar />
            <ReactQuill
                onChange={onEditorChange1}
                value={txtContent}
                //onBlur={onQuillDescriptionBlur}
                defaultValue={txtContent}
                className="myQuill"
                modules={modules}
                // formats={formats}
                theme={"snow"} />
        </div>

    );
};



/* 
 * Editor component with custom toolbar and content containers
 */

