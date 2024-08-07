"use client";

import React from "react";
import LessonBuilder from "./LessonBuilder";

const lessonContent = [
  { type: "heading", text: "Introduction to React" },
  {
    type: "paragraph",
    text: "React is a JavaScript library for building user interfaces."
  },
  {
    type: "paragraph",
    text: "It is maintained by Facebook and a community of individual developers and companies."
  },
  {
    type: "paragraph",
    text: "React can be used as a base in the development of single-page or mobile applications."
  },
  {
    type: "paragraph",
    text: "It is a component-based library which means that it allows you to build encapsulated components that manage their own state."
  },
  { type: "link", text: "Learn more about React", url: "https://reactjs.org" },
  {
    type: "image",
    src: "https://i.pinimg.com/564x/d2/9f/af/d29faf3e1eeb089201b42e5a0fdbfc2b.jpg",
    alt: "Learn React - Main Concepts"
  },
  {
    type: "video",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Example Video"
  },
  { type: "codeblock", code: 'console.log("Hello, World!");' },
  {
    type: "quiz",
    question: "What is React?",
    options: ["Library", "Framework", "Language"]
  },
  { type: "divider" }
];

function page() {
  return <LessonBuilder content={lessonContent} />;
}

export default page;
