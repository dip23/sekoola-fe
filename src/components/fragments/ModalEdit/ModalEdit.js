import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { Button, Modal } from '../../elements';
import { FlatInputText } from '../../fields';

export default function ModalEdit(props) {
  // semua props wajib
  const {
    data,
    onClose,
    show,
    title,
    onSubmit,
    inputGroup,
    postLoading = false,
  } = props;

  // const [inputs, setInputs] = useState({});

  // let defaultInputsValue;

  // console.log(data);

  // const setInputModalValue = (textValue, objValue) => {
  //   const prevInput = inputs;
  //   const stateData = {
  //     ...prevInput,
  //     [objValue]: textValue,
  //   };
  //   setInputs({ ...stateData });
  //   console.log('stateData', stateData);
  // };

  return (
    <Modal
      className={styles.modalEdit}
      title={title}
      onClose={postLoading === false ? onClose : null}
      show={show}
    >
      <form onSubmit={(e) => onSubmit(e)}>
        {inputGroup &&
          data &&
          inputGroup.map((obj, idx) => {
            return (
              <FlatInputText
                key={idx}
                name={obj.label}
                label={obj.label}
                type="text"
                className={styles.inputText}
                defaultValue={data[obj.value]}
                placeholder={data[obj.value]}
                autoFocus={idx === 0 ? true : false}
                //* gajadi dipake, jadinya pake form
                // setParentTextValue={(textValue) =>
                //   setInputModalValue(textValue, obj.value)
                // }
              />
            );
          })}
        <div className={styles.containerButton}>
          <Button
            smallBtn
            color="yellow"
            label="Simpan"
            disabled={postLoading}
          />
        </div>
      </form>
    </Modal>
  );
}
