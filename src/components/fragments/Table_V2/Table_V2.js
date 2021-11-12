import React from 'react';
import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Table_V2(props) {
  const {
    className,
    clickable,
    data,
    column,
    editable,
    detailClick,
    orderedHead,
    handleClickRow,
    handleClickDetail
  } = props;

  let prevMatpel = null;
  let prevTingkatan = null;
  let prevIndex = null;
  let countIndex = 1;

  const classes = [
    styles.rootTable,
    orderedHead && styles.firstHeadArea,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rows = [];

  for (let idx = 0; idx < data.length; idx++) {
    const item = data[idx];
    if (countIndex !== prevIndex && idx !== 0) prevIndex = countIndex;
    if (item.matpel !== prevMatpel) {
      if (idx !== 0) countIndex += 1;
    }
    rows.push(
      <TableRow
        clickable={clickable}
        column={column}
        detailClick={detailClick}
        editable={editable}
        item={item}
        idx={idx}
        key={idx}
        handleClickRow={() => handleClickRow && handleClickRow(item)}
        handleClickDetail={handleClickDetail}
        prevMatpel={prevMatpel}
        prevTingkatan={prevTingkatan}
        prevIndex={prevIndex}
        countIndex={countIndex}
      />
    );
    if (item.matpel !== prevMatpel) {
      prevMatpel = item.matpel;
    }
    if (item.tingkatan !== prevTingkatan) prevTingkatan = item.tingkatan;
  }

  return (
    <>
      <table className={classes}>
        <thead className={styles.tableHead}>
          <tr>
            {/* Ini juga dinamis harusnya */}
            <th>{orderedHead ? 'Urutan' : 'No.'}</th>
            {column &&
              column.map((i, idx) => <TableHeader data={i} key={idx} />)}
            {editable && (
              <>
                <th />
                <th />
              </>
            )}
            {detailClick && (
              <th />
            )}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {/* {data &&
            data.map((i, idx) => (
              <TableRow
                clickable={clickable}
                column={column}
                editable={editable}
                item={i}
                idx={idx}
                key={idx}
                handleClick={() => onClick(i)}
              />
            ))} */}
          {rows.map((row) => row)}
        </tbody>
      </table>
    </>
  );
}

export function TableHeader({ data }) {
  return <th>{data.heading}</th>;
}

function TableRow(props) {
  const {
    clickable,
    column,
    detailClick,
    item,
    idx,
    editable,
    handleClickRow,
    handleClickDetail,
    prevMatpel,
    prevTingkatan,
    prevIndex,
    countIndex,
  } = props;

  const classes = [
    !clickable && styles.nonActive,
    countIndex % 2 === 0 && styles.even,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr
      key={idx}
      className={classes}
      onClick={() => handleClickRow && handleClickRow(item)}
    >
      {/* <td>{idx + 1}</td> */}
      <td>{countIndex === prevIndex ? '' : countIndex}</td>
      {column &&
        column.map((cItem, cIdx) => {
          const { value } = cItem;
          if (value === 'matpel') {
            if (item[value] === prevMatpel) {
              return <td key={cIdx}></td>;
            } else {
              return <td key={cIdx}>{item[value] || '-'}</td>;
            }
          }

          if (value === 'tingkatan') {
            if (item[value] === prevTingkatan) {
              return <td key={cIdx}></td>;
            } else {
              return <td key={cIdx}>{item[value] || '-'}</td>;
            }
          }
          return <td key={cIdx}>{item[value] || '-'}</td>;
        })}
      {editable && (
        <>
          <td>
            <FontAwesomeIcon icon={faEdit} />
          </td>
          <td>
            <FontAwesomeIcon icon={faTrash} />
          </td>
        </>
      )}
      {detailClick && (
        <>
          <td onClick={() => handleClickDetail(item)} style={{ pointerEvents: 'visible' }}>
            <FontAwesomeIcon icon={faClipboard} />
          </td>
        </>
      )}
    </tr>
  );
}
