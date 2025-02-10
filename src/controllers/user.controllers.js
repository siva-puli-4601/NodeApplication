import { read } from "fs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFile } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Readable } from "stream";

const register=asyncHandler(async (req,res)=>
{
    console.log("haoi")
    const file=req.file.path
    console.log(file)
    const result=await uploadFile(file);
    // console.log("cloudinary",result)
    return res.status(200).
    json(new ApiResponse(200,{apiUrl:result},"Health Check Passed"));
})

const getPDF=asyncHandler(async (req,res)=>
{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fileName = `siva_report.pdf`; // Custom file name
    const filePath = path.join(__dirname, fileName);
    
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text(`Report for siva`, { align: "center" });
    doc.moveDown().fontSize(14).text(`Hello siva, this is your custom report.`, { align: "left" });

    // Finalize the document
    doc.end();
    // console.log("hai");
    setTimeout(() => {
        console.log("✅ PDF Ready:", filePath);
        res.download(filePath, fileName, (err) => {
            if (err) console.error("❌ Download error:", err);
            fs.unlinkSync(filePath); // Delete file after download
        });
    }, 1000);
  
})

const dataStream= asyncHandler(async (req,res)=>
{
    res.setHeader("Content-Type", "text/plain");
    const stream = new Readable({
        read() {},
    });
    stream.pipe(res);

    let i = 0;
    const interval = setInterval(() => {
        if (i >= 1000) {
            stream.push(null); // End the stream
            clearInterval(interval);
        } else {
            stream.push(`Chunk ${i + 1}: This is a large response streaming...\n`);
            i++;
        }
    }, 10);
})

export {register,getPDF,dataStream}