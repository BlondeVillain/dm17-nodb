import React from 'react';

const List = props => {
  return props.list.map((val, i) => (
    <div>
      <h1 key={i}>{val.name}</h1>
      <button onClick={() => props.deletePerson(i)}>Delete</button>
    </div>
  ));
  //   <Card person={val} key={i} />
};

export default List;
