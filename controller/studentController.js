const db = require("../config/db");

//get all students list
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM student");
    if (data.length === 0) {
      return res.status(404).send({
        success: false,
        message: "no record is found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All students Records",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all student app",
      error,
    });
  }
};

//get student by id
const getStudentsById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "invalid or Provide student id",
      });
    }
    // const data=await db.query(`SELECT * FROM student WHERE id=studentId`)
    const data = await db.query(`SELECT * FROM student WHERE id=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no record found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All students Records",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get all student by id",
      error,
    });
  }
};

//create student
const createStudent = async (req, res) => {
  try {
    const { name, rollno, fees, medium } = req.body;
    if (!name || !rollno || !fees || !medium) {
      return res.status(500).send({
        success: false,
        message: "please provide all fields",
      });
    }
    const data = await db.query(
      `INSERT INTO student (name,rollno,fees,medium) VALUES(?,?,?,?)`,
      [name, rollno, fees, medium]
    );
    if (!data) {
      return res.status(500).send({
        message: "error in insertion",
      });
    }
    res.status(200).send({
      success: true,
      message: "insert data successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error create student api",
      error,
    });
  }
};

//updte student
// const updatestudent=async(req,res)=>{
// try {
//     const studentId=req.params.id
//     if(!studentId){
//         return res.status(404).send({
//             success:false,
//             message:"invalid id"
//         })
//     }
//     const {name,rollno,fees,medium}=req.body
//     const data=await db.query(`UPDATE student SET name=?,rollno=?,fees=?,medium=? WHERE id=?`,[name,rollno,fees,medium])
//     if(!data){
//         return res.status(500).send({
//             success:false,
//             message:"error in update data"
//         })
//     }
//     res.status(200).send({
//         success:true,
//         message:'added data successfully'
//     })
// } catch (error) {
//     console.log(error)
//     res.status(500).send({
//         success:false,
//         message:'error in update student api',
//         error
//     })

// }
// }
const updatestudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing student ID",
      });
    }

    // Destructure the required fields from the request body
    const { name, rollno, fees, medium } = req.body;

    // Validate if all fields are present
    if (!name || !rollno || !fees || !medium) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields (name, rollno, fees, medium)",
      });
    }

    // Perform the update query
    const result = await db.query(
      `UPDATE student SET name=?, rollno=?, fees=?, medium=? WHERE id=?`,
      [name, rollno, fees, medium, studentId]
    );

    // Check if the update was successful by verifying affected rows
    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "No student found with the provided ID to update",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student data updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating student data",
      error,
    });
  }
};

//delete student
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "please provide student id or valid student id",
      });
    }
    await db.query(`DELETE FROM student WHERE id=?`, [studentId]);
    res.status(200).send({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting student data",
      error,
    });
  }
};

module.exports = {
  deleteStudent,
  updatestudent,
  getStudents,
  getStudentsById,
  createStudent,
};
