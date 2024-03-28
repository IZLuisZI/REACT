function Sort() {
  return (
    <div className="sorting-tools ">
      <select name="sortOldToNew" className="color-sheme">
        <option className="color-sheme" value="default">
          Default
        </option>
        <option className="color-sheme" value="newest">
          {" "}
          Released - Newest
        </option>
        <option className="color-sheme" value="oldest">
          {" "}
          Released - Oldest
        </option>

        <option className="color-sheme" value="highest">
          Rating - Highest
        </option>
        <option className="color-sheme" value="lowest">
          Rating - Lowest
        </option>

        <option className="color-sheme" value="a-z">
          Name - A-Z
        </option>
        <option className="color-sheme" value="z-a">
          Name - Z-A
        </option>
      </select>
    </div>
  );
}

export default Sort;
