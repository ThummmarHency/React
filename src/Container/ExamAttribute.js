const ExamAttribute = (exam) => {
  const currentInpVal = {
    question: exam.question,
    note: exam.note,
    opt1: exam.opt1,
    opt2: exam.opt2,
    opt3: exam.opt3,
    opt4: exam.opt4,
    answer: exam.selectOpt,
  };
  let optionArray = [
    currentInpVal.opt1,
    currentInpVal.opt2,
    currentInpVal.opt3,
    currentInpVal.opt4,
  ];
  const radioBtnAttribute = [
    { value: exam.opt1 },
    { value: exam.opt2 },
    { value: exam.opt3 },
    { value: exam.opt4 },
  ];

  return [{ currentInpVal, optionArray, radioBtnAttribute }];
};

export default ExamAttribute;
