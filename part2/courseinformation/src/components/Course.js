const Course = ({course}) => {
    return(
        <>
            <h1>Web development curriculum</h1>
            {course.map((courseParts) => {
                return(
                    <div key={courseParts.id}>
                        <h2>{courseParts.name}</h2>
                        {courseParts.parts.map( part => <p key={part.id}>{part.name} {part.exercises}</p>)}
                        <p><strong>total of {courseParts.parts.reduce((sum, part) => sum + part.exercises, 0)} excercises</strong></p>
                    </div>
                )
            })} 
        </>
    )
}

export default Course