const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});
		console.log(
			"The Pig is in the Blanket! I repeat, the Pig is in the Blanket!"
		);
	} catch (error) {
		console.error("Ejecto Seato Cuz!:", error.message);
		process.exit(1); // Exit process with failure
	}
};

module.exports = connectDB;
