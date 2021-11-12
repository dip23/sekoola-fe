import React from 'react';
import styles from './styles.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingSpinner } from '../../elements';

export default function Table(props) {
  // props wajib : column, data, loading, postLoading
  const {
    className,
    clickable,
    data,
    column,
    editable,
    orderedHead,
    onClick: onClickRow,
    onClickEdit,
    onClickDelete,
    loading,
    postLoading,
  } = props;

  let totalColumn = column.length + 1;
  if (editable) {
    totalColumn += 2;
  }

  const classes = [
    styles.rootTable,
    orderedHead && styles.firstHeadArea,
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {loading && (
            <tr className={styles.nonActive}>
              <td colSpan={totalColumn}>
                <LoadingSpinner className={styles.spinner} />
              </td>
            </tr>
          )}
          {data && data.length === 0 && loading === false && (
            <tr className={styles.nonActive}>
              <td colSpan={totalColumn}>belum ada data</td>
            </tr>
          )}
          {data &&
            !loading &&
            data.map((i, idx) => (
              <TableRow
                clickable={clickable}
                column={column}
                editable={editable}
                item={i}
                idx={idx}
                key={idx}
                handleClickRow={() => onClickRow && onClickRow(i)}
                handleEdit={() => onClickEdit && onClickEdit(i)}
                handleDelete={() => onClickDelete && onClickDelete(i)}
                postLoading={postLoading}
              />
            ))}
        </tbody>
      </table>
    </>
  );
}

export function TableHeader({ data }) {
  return <th>{data.heading}</th>;
}

function TableRow({
  clickable,
  column,
  item,
  idx,
  editable,
  handleClickRow,
  handleEdit,
  handleDelete,
  postLoading,
}) {
  const classes = [!clickable && styles.nonActive].filter(Boolean).join(' ');

  return (
    <tr className={classes}>
      <td onClick={() => handleClickRow && handleClickRow(item)}>{idx + 1}</td>
      {column &&
        column.map((cItem, cIdx) => {
          const { value } = cItem;

          return (
            <td
              onClick={() => handleClickRow && handleClickRow(item)}
              key={cIdx}
            >
              {item[value] || '-'}
            </td>
          );
        })}
      {editable && (
        <>
          <td
            className={styles.tableIcon}
            onClick={() =>
              handleEdit && postLoading === false ? handleEdit(item) : null
            }
          >
            <FontAwesomeIcon icon={faEdit} />
          </td>
          <td
            className={styles.tableIcon}
            onClick={() =>
              handleDelete && postLoading === false ? handleDelete(item) : null
            }
          >
            <FontAwesomeIcon icon={faTrash} />
          </td>
        </>
      )}
    </tr>
  );
}
