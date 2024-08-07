import Link from "next/link";
import React from "react";

function Homepage() {
  return (
    <section className="min-h-screen bg-slate-200 grid grid-cols-2 place-content-center gap-5 p-5">
      <Link href="/counter">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Counter
        </div>
      </Link>
      <Link href="/todolist">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Todo List
        </div>
      </Link>
      <Link href="/todolist2">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Todo List V2
        </div>
      </Link>
      <Link href="/todolistWithpagination">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Todo List With Pagination
        </div>
      </Link>
      <Link href="/livecodeeditor">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Live Code Editor
        </div>
      </Link>
      <Link href="/flowise">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Flowise Chat
        </div>
      </Link>
      <Link href="/jamboard">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          JamBoard Application
        </div>
      </Link>
      <Link href="/diagram">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Diagram Application
        </div>
      </Link>
      <Link href="/table">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Reusable Table
        </div>
      </Link>
      <Link href="/kanban">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Kanban
        </div>
      </Link>
      <Link href="/form">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Form Builder
        </div>
      </Link>
      <Link href="/button">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Custom Button
        </div>
      </Link>
      <Link href="/pdfswaper">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          PDF Swaper
        </div>
      </Link>
      <Link href="/model">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Model
        </div>
      </Link>
      <Link href="/quiz">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Quiz
        </div>
      </Link>
      <Link href="/quiz-json-generator">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Quiz Json Generator
        </div>
      </Link>
      <Link href="/lessonBuilder">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Lesson Builder
        </div>
      </Link>
      <Link href="/quizv2">
        <div className="bg-white rounded-xl shadow p-5 text-xl font-bold">
          Quiz System V2
        </div>
      </Link>
    </section>
  );
}

export default Homepage;
