
const CategoryForm = (handleSubmit, name, date, setValue) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={name}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={date}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )
}

export default CategoryForm
