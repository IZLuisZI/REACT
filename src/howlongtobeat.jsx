function Hltb({ hltbData }) {
  if (!hltbData || !hltbData[0]) {
    return null;
  }
  return (
    <section className="howlongtobeat">
      <h2>
        {" "}
        <a href="https://howlongtobeat.com/"> HowLongToBeat</a>
      </h2>
      <article className="howlongtobeat-data">
        <div className="howlongtobeat-data-grid-child">
          <h4>{hltbData[0].gameplayMain} Hours</h4>
          <p>Main Story</p>
        </div>
        <div className="howlongtobeat-data-grid-child">
          <h4>{hltbData[0].gameplayMainExtra} Hours</h4>
          <p>Main Story + Extras</p>
        </div>
        <div className="howlongtobeat-data-grid-child">
          <h4>{hltbData[0].gameplayCompletionist} Hours</h4>
          <p>Completionist </p>
        </div>
      </article>
    </section>
  );
}

export default Hltb;
