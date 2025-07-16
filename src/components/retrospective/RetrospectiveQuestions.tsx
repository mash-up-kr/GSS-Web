import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';

import SectionHeader from '@/components/retrospective/SectionHeader';
import type { RetrospectiveQuestionsProps } from '@/types/retrospective';

export default function RetrospectiveQuestions({
  questions,
  selectedQuestionIds,
  onSelectQuestion,
}: RetrospectiveQuestionsProps) {
  return (
    <section className={'flex flex-col gap-[20px]'}>
      <SectionHeader
        title={'AI 생성 회고 질문'}
        description={'이번 작업에서 회고하고 싶은 질문을 골라보세요.'}
        icon={<span>{'회고 아이콘'}</span>}
      />

      <Tabs defaultValue={questions[0]?.category}>
        <TabsList>
          {questions.map(({ category }) => (
            <TabsTrigger value={category} key={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions.map(({ category, questions: items }) => (
          <TabsContent value={category} className={'flex flex-col items-end gap-[20px] pt-[20px]'} key={category}>
            <ul className={'flex w-full flex-col gap-[12px]'}>
              {items.map(({ questionId, question }) => (
                <div
                  className={
                    'bg-dark-grey-50 bg-dark-grey border-outline flex w-full gap-[28px] rounded-[6px] border-[1px] py-[16px] pr-[12px] pl-[24px]'
                  }
                  key={questionId}
                >
                  <p className={'grow-1'}>{question}</p>
                  <button
                    className={
                      'ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 bg-transparent text-lg'
                    }
                    onClick={() => onSelectQuestion(questionId)}
                  >
                    {selectedQuestionIds.includes(questionId) ? '✔️' : '+'}
                  </button>
                </div>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
