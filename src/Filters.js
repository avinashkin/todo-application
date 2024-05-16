const Filters = (props = {}) => {
    const {setSelectedFilter, categories, applyFilters} = props;
    return (
      <div className="mb-5 animate-slide-down">
        <h2 className="text-base sm:text-xl mb-4">Filters</h2>
        <div className="flex-col sm:flex-row flex gap-2 lg:gap-8">
          <div className="flex gap-4 items-center">
            <label htmlFor="status">Status:</label>
            <select id="status" className="border rounded-lg p-1" onChange={(e) => setSelectedFilter('status', e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="status">Categories:</label>
            <select id="category" className="border rounded-lg p-1" onChange={(e) => setSelectedFilter('category', e.target.value)}>
                <option value="all">All</option>
                {categories.map((category, idx) => {
                    return <option value={category} key={idx}>{category}</option>
                })}
            </select>
          </div>
          {/* <div className="flex gap-4 items-center">
            <label htmlFor="tags">Tags:</label>
            <select id="tags" className="border rounded-lg p-1" onChange={(e) => setSelectedFilter('tag', e.target.value)}>
                <option value="all">All</option>
                {tags.map((tag, idx) => {
                    return <option value={tag} key={idx}>{tag}</option>
                })}
            </select>
          </div> */}
          <button className="p-1 w-20 border hover:shadow rounded-lg" onClick={applyFilters}>Apply</button>
        </div>
      </div>
    );
  };

  export default Filters;