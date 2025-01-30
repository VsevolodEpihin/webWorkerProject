import React, { ChangeEvent, useEffect, useState } from 'react';

import useWebWorker from '../../hooks/useWebWorker';
import { Replacement, changeWords } from '../../helpers/changeWords';

import { validFields } from '../../helpers/validFields';
import {
  Modal,
  NameField,
  RemakeContainer,
  TransformedText,
  UnprocessedText,
  WorkerCheckbox
} from '../../components';
import { getTextsList, loadText, saveText } from '../../api/api';
import { TextDto } from '../../types/TextDto';



import './WorkersPage.css';

const WorkersPage = () => {
  const [value, setValue] = useState('');
  const [nameText, setNameText] = useState('');
  const [requestedName, setRequestedName] = useState('');
  const [resultTexts, setResultTexts] = useState<TextDto | TextDto[]>();
  const [enableWorker, setEnableWorker] = useState(false);
  const [replacements, setReplacements] = useState<Replacement[]>([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isRequest, setIsRequest] = useState(false);
  const [shouldGetText, setShouldGetText] = useState(false);
  const [isCloseModal, setIsCloseModal] = useState(false)
  const [shouldGetAllTexts, setShouldGetAllTexts] = useState(false);

  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const { workerResult, run } = useWebWorker((text: string) => {
    return changeWords(text, replacements);
  });

  useEffect(() => {
    const hasInvalidFields = validFields(replacements);

    setIsButtonDisabled(!value.trim() || hasInvalidFields);
  }, [value, replacements]);

  useEffect(() => {
      const fetchRequest = async () => {
        if(nameText) {
          await saveText(workerResult, nameText);
        }
      };

      fetchRequest();
  }, [isRequest]);

  useEffect(() => {
    const fetchRequest = async () => {
      if(requestedName) {
        const response = await loadText(requestedName);
        setResultTexts(response)
        setIsCloseModal(false)
      }
    };

    fetchRequest();
  }, [shouldGetText])

  useEffect(() => {
    const fetchRequest = async () => {
      if(!isFirstLoad) {
        const response = await getTextsList();
        setResultTexts(response)
        setIsCloseModal(false)
      } else {
        setIsFirstLoad(false)
      }
    };

    fetchRequest();
  }, [shouldGetAllTexts])

  const handleClickWithWorker = () => {
    if (enableWorker) {
      run(value, replacements);
    } else {
      run(value, replacements, false);
    }

    setIsRequest(prev => !prev)
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleChangeType = () => {
    setEnableWorker(prev => !prev);
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameText(e.target.value);
  }

  const handleChangeRequestedName = (e: ChangeEvent<HTMLInputElement>) => {
    setRequestedName(e.target.value);
  }

  const handleGetRequestedName = () => {
    if(requestedName) {
      setShouldGetText(prev => !prev);
    }
  }

  const handleGetAllTexts = () => {
    setShouldGetAllTexts(prev => !prev);
  }

  return (
    <div className='container'>
      <NameField
        type="text"
        placeholder="Введите название текста"
        handleChange={handleChangeName}
      />
      <UnprocessedText handleChange={handleChange} value={value}/>
      <WorkerCheckbox handleChangeType={handleChangeType}/>
      <RemakeContainer onReplacementsChange={setReplacements}/>
      <button
        onClick={handleClickWithWorker}
        className='buttonText'
        disabled={isButtonDisabled}
      >
        Заменить текст
      </button>
      <NameField
        type="text"
        placeholder="получить текст по имени"
        handleChange={handleChangeRequestedName}
      />
        <button onClick={handleGetRequestedName}>получить</button>
        <button onClick={handleGetAllTexts}>получить все текста</button>
      <pre>
        {workerResult && <TransformedText result={workerResult} />}
      </pre>
      {resultTexts && !isCloseModal &&
      <Modal
        resultTexts={resultTexts}
        closeModal={setIsCloseModal}
      />
      }
    </div>
  );
};

export default WorkersPage;
