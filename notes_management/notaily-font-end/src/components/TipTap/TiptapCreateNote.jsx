import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { Placeholder } from '@tiptap/extensions'
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
    FaBold,
    FaItalic,
    FaListOl,
    FaListUl,
    FaQuoteLeft,
    FaRedo,
    FaStrikethrough,
    FaUnderline,
    FaUndo,
} from "react-icons/fa";
import { TbCode } from "react-icons/tb";
import "./TipTapCreateNote.scss";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";


const MenuBar = ({ editor, isOpenTextChange, setOpenTextChange }) => {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    })


    if (!editor) {
        return null;
    }

    const [changeArrow, setChangeArrow] = useState(false);
    const [selectedValue, setSelectedValue] = useState("p");



    const handleChangeSelect = (e) => {
        const value = e.target.value;
        setSelectedValue(value);

        if (value === "p") {
            editor.chain().focus().setParagraph().run();
            setActivetextChange(false);
        } else {
            const level = parseInt(value.slice(1), 10);
            editor.chain().focus().setHeading({ level }).run();
            setActivetextChange(true);
        }
        console.log(e.target.value);
    }

    const handleClickSelect = (e) => {
        setChangeArrow(!changeArrow);
    }

    return (
        <div className="menu-bar">
            <div className="heading-dropdown">
                <div
                    className={`heading-display heading-display--${selectedValue}`}
                >
                    {selectedValue === "p" ? "Normal" : `Heading ${selectedValue.replace("h", "")}`}
                </div>
                <select
                    className="heading-select-hidden"
                    onChange={handleChangeSelect}
                    onClick={handleClickSelect}
                >
                    <option value="p">Normal</option>
                    {[1, 2, 3, 4, 5, 6].map(l => (
                        <option key={l} value={`h${l}`}>
                            Heading {l}
                        </option>
                    ))}
                </select>
                {
                    changeArrow ? <IoMdArrowDropup className="heading-select__icon" /> : <IoMdArrowDropdown className="heading-select__icon" />
                }
            </div>

            <div className="menu-bar__text-style">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is_active text-bold text-bold--active" : "text-bold"}
                >
                    <FaBold />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is_active text-italic text-italic--active" : "text-italic"}
                >
                    <FaItalic />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "is_active text-underline text-underline--active" : "text-underline"}
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is_active text-strike text-strike--active" : "text-strike"}
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "is_active text-bulletList text-bulletList--active" : "text-bulletList"}
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "is_active text-orderedList text-orderedList--active" : "text-orderedList"}
                >
                    <FaListOl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "is_active text-blockquote text-blockquote--active" : "text-blockquote"}
                >
                    <FaQuoteLeft />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editorState.isCodeBlock ? 'is-active text-codeblock text-codeblock--active' : 'text-codeblock'}
                >
                    <TbCode />
                </button>
            </div>
            <div className="menu-bar__roll-back">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <FaUndo />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

export const Tiptap = ({ setDescription }) => {
    const [isOpenTextChange, setOpenTextChange] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: 'Start typing or paste an image...',
            }),
        ],
        content: ``,

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setDescription(html);
        },
    });

    return (
        <div className="menuBar__textEditor">
            <MenuBar
                editor={editor}
                isOpenTextChange={isOpenTextChange}
                setOpenTextChange={setOpenTextChange}
            />
            <EditorContent editor={editor} />
        </div>
    );
};