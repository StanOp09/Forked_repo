import React, { useState, useRef, useEffect } from 'react';
import { addToDB, getFromDB } from '../../assets/CrudIndex';
import { openDB } from '../../assets/indexedDB';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import LinkTool from '@editorjs/link';
import Table from '@editorjs/table';
import RawTool from '@editorjs/raw';
import CodeTool from '@editorjs/code';
import Checklist from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import SimpleImage from '@editorjs/simple-image';
import { useMutation } from '@apollo/client';
import { UPDATE_ARTICLE } from '../../utils/mutations';
import styles from './ContentEditor.module.css';


const ArticleEditor = ({ articleId, title, content, createdArticles, createdPosts }) => {
  const editorRef = useRef(null);
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const [titleInput, setTitleInput] = useState(title);
  const autosaveInterval = 10000;


  useEffect(() => {
    openDB();

    const getSavedContent = async () => {
      const savedContent = await getFromDB('articles', articleId);
      const contentData = savedContent ? JSON.parse(savedContent.content) : JSON.parse(content);
      if (Array.isArray(contentData)) {
        return { blocks: contentData };
      }
      return contentData;
    };


    getSavedContent().then((contentData) => {

      const initEditor = () => {

        return new EditorJS({

          holder: 'editorjs',
          data: contentData,
          tools: {
            header: Header,
            list: List,
            image: ImageTool,
            quote: Quote,
            linkTool: LinkTool,
            table: Table,
            raw: RawTool,
            code: CodeTool,
            checklist: Checklist,
            embed: Embed,
            delimiter: Delimiter,
            inlineCode: InlineCode,
            warning: Warning,
            marker: Marker,
            simpleImage: SimpleImage,
          },

          onReady: () => {
            console.log('Editor.js is ready to work!');
          },

          onChange: () => {
            if (editorRef.current) {
              editorRef.current.save().then((outputData) => {
                const contentToSave = {
                  time: new Date().getTime(),
                  blocks: outputData.blocks,
                  version: EditorJS.version 
                };
                addToDB('articles', { id: articleId, content: JSON.stringify(contentToSave) });
              });
            }
          }
          
        }, []);
      };

      if (!editorRef.current) {
        editorRef.current = initEditor();
      }

    });


    const intervalId = setInterval(() => {
      if (editorRef.current) {
        editorRef.current.save().then((outputData) => {
          addToDB('articles', { id: articleId, content: JSON.stringify(outputData) });
          console.log('Editor auto-saved to IndexedDB');
        });
      }
    }, autosaveInterval);

    return () => {
      clearInterval(intervalId);
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [content]);


  const handleSave = async () => {
    const outputData = await editorRef.current.save();
    const saveResult = await updateArticle({
      variables: {
        id: articleId,
        title: titleInput,
        content: JSON.stringify(outputData.blocks),
        createdArticles,
        createdPosts,
      },
    });


    if (saveResult.data) {
      console.log('Article saved to backend', saveResult.data);
    }
  };

  const titleChange = (event) => {
    setTitleInput(event.target.value);
  };

  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        id="article-title"
        className={styles.titleInput}
        placeholder="Enter article title... (required)"
        value={titleInput}
        onChange={titleChange}
      />
      <div id="editorjs" className={styles.editorContainer}></div>
      <button onClick={handleSave} className={styles.saveButton} disabled={!titleInput.trim()}>
        Save Article
      </button>
    </div>
  );
};

export default ArticleEditor;