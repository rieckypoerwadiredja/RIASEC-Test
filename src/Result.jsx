const Results = ({ answers }) => {
  const scores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  answers.forEach((answer) => {
    switch (answer) {
      case "Sangat Setuju":
        scores["R"]++;
        break;
      case "Setuju":
        scores["I"]++;
        break;
      case "Netral":
        scores["A"]++;
        break;
      case "Tidak Setuju":
        scores["S"]++;
        break;
      case "Sangat Tidak Setuju (Enterprising)":
        scores["E"]++;
        break;
      case "Sangat Tidak Setuju (Conventional)":
        scores["C"]++;
        break;
      default:
        break;
    }
  });

  return (
    <div>
      <h1>Results</h1>
      <p>Realistic: {scores.R}</p>
      <p>Investigative: {scores.I}</p>
      <p>Artistic: {scores.A}</p>
      <p>Social: {scores.S}</p>
      <p>Enterprising: {scores.E}</p>
      <p>Conventional: {scores.C}</p>
    </div>
  );
};
export default Results;
