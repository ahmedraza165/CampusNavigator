import MessageTextBox from "@/components/MessageTextBox";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import React from "react";
import { base_url } from "@/lib/helpers";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
export const dynamicParams = true;

interface PropsType {
  params: { orgId: string };
}
const getData = async (orgId: string, cookie: any) => {
  const res = await fetch(`${base_url}/api/organization/${orgId}`, {
    headers: {
      "content-type": "application/json",
      Cookie: cookie,
    },
    method: "GET",
    next: { revalidate: 60 },
  });
  const org = res.json();
  return org;
};

export default async function SingleOrganization({ params }: PropsType) {
  const cookie = cookies();
  const { organization } = await getData(params.orgId, cookie);
  if (!organization?.id) return notFound();

  const handleChatSelect = (chat: any) => {};

  return (
      <div className="px-4 sm:px-6 lg:px-8 relative h-full max-w-4xl mx-auto">
        <div className="relative top-20 md:top-12">
          <div className={"space-y-5"}>
            <div className={"flex gap-3"}>
              <div
                className={
                  "bg-blue-800 mt-1 rounded-full w-6 h-6 text-white text-sm flex items-center justify-center"
                }
              >
                AN
              </div>
              <div>
                <h2 className={"text-lg text-black font-semibold"}>You</h2>
                <div>Lorem ipsum</div>
              </div>
            </div>
            <div className={"flex gap-3"}>
              <div
                className={
                  "bg-blue-800 mt-1 rounded-full w-8 h-6 text-white text-sm flex items-center justify-center"
                }
              >
                AN
              </div>
              <div>
                <h2 className={"text-lg text-black font-semibold"}>GPT</h2>
                <div>
                  What is a paragraph? Paragraphs are the building blocks of
                  papers. Many students define paragraphs in terms of length: a
                  paragraph is a group of at least five sentences, a paragraph
                  is half a page long, etc. In reality, though, the unity and
                  coherence of ideas among sentences is what constitutes a
                  paragraph. A paragraph is defined as “a group of sentences or
                  a single sentence that forms a unit” (Lunsford and Connors
                  116). Length and appearance do not determine whether a section
                  in a paper is a paragraph. For instance, in some styles of
                  writing, particularly journalistic styles, a paragraph can be
                  just one sentence long. Ultimately, a paragraph is a sentence
                  or group of sentences that support one main idea. In this
                  handout, we will refer to this as the “controlling idea,”
                  because it controls what happens in the rest of the paragraph.
                  How do I decide what to put in a paragraph? Before you can
                  begin to determine what the composition of a particular
                  paragraph will be, you must first decide on an argument and a
                  working thesis statement for your paper. What is the most
                  important idea that you are trying to convey to your reader?
                  The information in each paragraph must be related to that
                  idea. In other words, your paragraphs should remind your
                  reader that there is a recurrent relationship between your
                  thesis and the information in each paragraph. A working thesis
                  functions like a seed from which your paper, and your ideas,
                  will grow. The whole process is an organic one—a natural
                  progression from a seed to a full-blown paper where there are
                  direct, familial relationships between all of the ideas in the
                  paper. The decision about what to put into your paragraphs
                  begins with the germination of a seed of ideas; this
                  “germination process” is better known as brainstorming. There
                  are many techniques for brainstorming; whichever one you
                  choose, this stage of paragraph development cannot be skipped.
                  Building paragraphs can be like building a skyscraper: there
                  must be a well-planned foundation that supports what you are
                  building. Any cracks, inconsistencies, or other corruptions of
                  the foundation can cause your whole paper to crumble. So,
                  let’s suppose that you have done some brainstorming to develop
                  your thesis. What else should you keep in mind as you begin to
                  create paragraphs? Every paragraph in a paper should be:
                  Unified: All of the sentences in a single paragraph should be
                  related to a single controlling idea (often expressed in the
                  topic sentence of the paragraph). Clearly related to the
                  thesis: The sentences should all refer to the central idea, or
                  thesis, of the paper (Rosen and Behrens 119). Coherent: The
                  sentences should be arranged in a logical manner and should
                  follow a definite plan for development (Rosen and Behrens
                  119). Well-developed: Every idea discussed in the paragraph
                  should be adequately explained and supported through evidence
                  and details that work together to explain the paragraph’s
                  controlling idea (Rosen and Behrens 119). How do I organize a
                  paragraph? There are many different ways to organize a
                  paragraph. The organization you choose will depend on the
                  controlling idea of the paragraph. Below are a few
                  possibilities for organization, with links to brief examples:
                  Narration: Tell a story. Go chronologically, from start to
                  finish. (See an example.) Description: Provide specific
                  details about what something looks, smells, tastes, sounds, or
                  feels like. Organize spatially, in order of appearance, or by
                  topic. (See an example.) Process: Explain how something works,
                  step by step. Perhaps follow a sequence—first, second, third.
                  (See an example.) Classification: Separate into groups or
                  explain the various parts of a topic. (See an example.)
                  Illustration: Give examples and explain how those examples
                  support your point. (See an example in the 5-step process
                  below.) Illustration paragraph: a 5-step example From the list
                  above, let’s choose “illustration” as our rhetorical purpose.
                  We’ll walk through a 5-step process for building a paragraph
                  that illustrates a point in an argument. For each step there
                  is an explanation and example. Our example paragraph will be
                  about human misconceptions of piranhas. Step 1. Decide on a
                  controlling idea and create a topic sentence Paragraph
                  development begins with the formulation of the controlling
                  idea. This idea directs the paragraph’s development. Often,
                  the controlling idea of a paragraph will appear in the form of
                  a topic sentence. In some cases, you may need more than one
                  sentence to express a paragraph’s controlling idea.
                  Controlling idea and topic sentence — Despite the fact that
                  piranhas are relatively harmless, many people continue to
                  believe the pervasive myth that piranhas are dangerous to
                  humans. Step 2. Elaborate on the controlling idea Paragraph
                  development continues with an elaboration on the controlling
                  idea, perhaps with an explanation, implication, or statement
                  about significance. Our example offers a possible explanation
                  for the pervasiveness of the myth. Elaboration — This
                  impression of piranhas is exacerbated by their
                  mischaracterization in popular media. Step 3. Give an example
                  (or multiple examples) Paragraph development progresses with
                  an example (or more) that illustrates the claims made in the
                  previous sentences.
                </div>
              </div>
            </div>
          </div>
        </div>
        <MessageTextBox />
      </div>
  );
}
