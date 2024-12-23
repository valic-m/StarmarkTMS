import React from 'react';

interface Rating {
  id: string;
  score: number;
  comment: string;
}

const RatingsTable: React.FC<{ ratings: Rating[] }> = ({ ratings }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Rating ID</th>
        <th>Score</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>
      {ratings.map(rating => (
        <tr key={rating.id}>
          <td>{rating.id}</td>
          <td>{rating.score}</td>
          <td>{rating.comment}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RatingsTable;
