export function uploadcontroller(req, res) {
    try {
        const { file } = req;
        console.log(file);
        let url = ""
        if (file) {
            url = `${"http://localhost:5000"}/v1/images/${file.filename}`;
        }
        res.json({url});
    } catch (error) {
        next(error);
    }
}