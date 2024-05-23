import XLSX from 'xlsx';
import axios from 'axios';

export const isSameAgGridRowId = () => {

}

export const getDanhSachTiet = tiet => {
    if (tiet.includes(",")) return tiet.split(",")
    if (tiet === "*") return ["*"]
    return tiet.split("")
}


export const extractInputStrings = (text) => {
    // Regular expression to match lines starting with digits followed by tab characters or spaces
    const regex = /^\d+\s+.*$/gm;
    
    // Extract input strings using regex
    const inputStrings = text.match(regex);
    
    // If no input strings are found, return an empty array
    if (!inputStrings) {
        return [];
    }
    
    // Return the array of input strings
    return inputStrings;
}

// Example usage:
// const text = `Skip to contentSkip to navigation
//
// Home
// Giới thiệu 
// Thông báo 
// Quy định - Hướng dẫn 
// Kế hoạch năm
// Chương trình đào tạo 
// Lịch 
// Sinh viên 
// Liên hệ - Góp ý
// Thông tin cần xem
// Học kỳ
//
// Năm học
//
// THÔNG TIN ĐĂNG KÝ HỌC PHẦN HỌC KỲ 2 NĂM 2023 - 2024
// MSSV: 21522393
//
// STT	  MãMH	Lớp	Môn	Số TC	  Giảng viên	Thứ / Ca / Phòng học
// 1	CS105	CS105.O21.KHCL	Đồ họa máy tính	3	Cáp Phạm Đình Thăng	Thứ 4 Tiết 123 Phòng B1.10
// 2	CS105	CS105.O21.KHCL.1	Đồ họa máy tính (TH - HT2)	1	Cáp Phạm Đình Thăng	Thứ * Tiết * Phòng *
// 3	CS117	CS117.O21	Tư duy tính toán	3	Ngô Đức Thành	Thứ 6 Tiết 678 Phòng C214
// 4	CS117	CS117.O21.1	Tư duy tính toán (TH - HT2)	1	Ngô Đức Thành	Thứ * Tiết * Phòng *
// 5	NT213	NT213.O22.ATCL	Bảo mật web và ứng dụng	2	Nghi Hoàng Khoa	Thứ 6 Tiết 23 Phòng C301
// 6	NT213	NT213.O22.ATCL.1	Bảo mật web và ứng dụng (TH - HT1)	1	Ngô Đức Hoàng Sơn	Thứ 5 Tiết 12345 Phòng B4.06
// 7	NT230	NT230.O21.ATCL	Cơ chế hoạt động của mã độc	2	Phạm Văn Hậu
// Phan Thế Duy	Thứ 3 Tiết 23 Phòng C212
// 8	NT230	NT230.O21.ATCL.1	Cơ chế hoạt động của mã độc (TH - HT1)	1	Tô Trọng Nghĩa	Thứ 3 Tiết 67890 Phòng B4.08
// 9	SE334	SE334.O21.PMCL	Các phương pháp lập trình	2	Huỳnh Tuấn Anh	Thứ 7 Tiết 1234 Phòng B4.10
// 10	SE334	SE334.O21.PMCL.1	Các phương pháp lập trình (TH - HT2)	1	Huỳnh Tuấn Anh	Thứ * Tiết * Phòng *Tổng tín chỉ đã đăng ký: 17
// Số TC học phí: 19
// Học phí tạm tính: 19.000.000 (đ)
// PHÒNG ĐÀO TẠO ĐẠI HỌC
// Phòng A120, Trường Đại học Công nghệ Thông tin.
// Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh.
// Điện thoại: (028) 372 51993, Ext: 113(Hệ từ xa qua mạng), 112(Hệ chính quy).
// Email: phongdaotaodh@uit.edu.vn`;
//
// const inputStrings = extractInputStrings(text);
// console.log(inputStrings);

export const parseCourseInfo = (inputString) => {
    // Split the input string by newlines first
    const lines = inputString.split('\n');

    // Handle cases with multiline instructor names
    if (lines.length > 2) {
        lines[1] = lines.slice(1).join(' ');
    }

    // Join the lines back with a space for uniformity
    const unifiedString = lines.join(' ');

    // Split by whitespace and filter out empty parts
    const parts = unifiedString.split(/\s+/).filter(Boolean);

    // Ensure there are at least three parts (courseNumber, courseCode, classCode)
    if (parts.length < 3) {
        throw new Error("Invalid input string format");
    }

    // Extract the mandatory parts
    let courseNumber, courseCode, classCode, startIndex;
    if (parts[0].match(/^\d+$/)) {
        courseNumber = parts[0];
        courseCode = parts[1];
        classCode = parts[2];
        startIndex = 3;
    } else {
        courseNumber = null;
        courseCode = parts[0];
        classCode = parts[1];
        startIndex = 2;
    }

    // Check if classCode is in the expected format
    if (!classCode.match(/^[A-Za-z0-9.]+$/)) {
        throw new Error("Invalid input string format: classCode missing or invalid");
    }

    // Extract optional parts
    let courseName = null, credits = null, instructors = null, schedule = null, location = null;
    
    if (startIndex < parts.length) {
        // Look for credits which should be a number
        const creditsIndex = parts.slice(startIndex).findIndex(part => part.match(/^\d+$/));
        if (creditsIndex !== -1) {
            credits = parseInt(parts[startIndex + creditsIndex]);
            courseName = parts.slice(startIndex, startIndex + creditsIndex).join(' ');
            startIndex += creditsIndex + 1;
        } else {
            courseName = parts.slice(startIndex).join(' ');
        }
    }

    if (startIndex < parts.length) {
        const remainingParts = parts.slice(startIndex).join(' ');
        instructors = remainingParts.match(/^[^Thứ]+/);
        if (instructors) {
            instructors = instructors[0].trim().split(/,\s*|\s{2,}/);
        }
        schedule = remainingParts.match(/(Thứ\s+\*?[\d\s]+\s+Tiết\s+\*?[\d\s\-]+)/) ? remainingParts.match(/(Thứ\s+\*?[\d\s]+\s+Tiết\s+\*?[\d\s\-]+)/)[0] : null;
        location = remainingParts.match(/(Phòng\s+[\w.\*]+)/) ? remainingParts.match(/(Phòng\s+[\w.\*]+)/)[0] : null;
    }

    // Construct the object to return
    const result = {
        courseNumber: courseNumber || null,
        courseCode: courseCode || null,
        classCode: classCode,
        courseName: courseName || null,
        credits: credits || null,
        instructors: instructors || null,
        schedule: schedule || null,
        location: location || null
    };

    return result;
}


// TODO: this old version still works as expected, it's just not priorities the classcode 
// export const parseCourseInfo = (inputString) => {
//     // Split the input string by newlines first
//     const lines = inputString.split('\n');
//
//     // Handle cases with multiline instructor names
//     if (lines.length > 2) {
//         lines[1] = lines.slice(1).join(' ');
//     }
//
//     // Join the lines back with a space for uniformity
//     const unifiedString = lines.join(' ');
//
//     // Regular expression to capture meaningful parts, making schedule and location optional
//     const regex = /^(\d+)\s+([A-Za-z0-9]+)\s+([A-Za-z0-9.]+)\s+(.+?)\s+(\d+)\s+(.+?)(?:\s+(Thứ\s+\*?[\d\s]+\s+Tiết\s+\*?[\d\s\-]+)\s+(Phòng\s+[\w.\*]+))?$/;
//
//     // Match the unified string with the regex
//     const match = unifiedString.match(regex);
//
//     // If the match fails, throw an error
//     if (!match) {
//         throw new Error("Invalid input string format");
//     }
//
//     // Construct the object to return
//     const result = {
//         courseNumber: match[1],
//         courseCode: match[2],
//         classCode: match[3],
//         courseName: match[4],
//         credits: parseInt(match[5]),
//         instructors: match[6].split(/,\s*|\s{2,}/),  // Split multiple instructors by commas or multiple spaces
//     };
//
//     // Add optional schedule and location if they exist
//     if (match[7] && match[8]) {
//         result.schedule = match[7];
//         result.location = match[8];
//     }
//
//     return result;
// }

// // Example usage:
// const inputStrings = [
//     "1\tCS105\tCS105.O21.KHCL\tĐồ họa máy tính\t3\tCáp Phạm Đình Thăng\tThứ 4 Tiết 123\tPhòng B1.10",
//     "2\tCS105\tCS105.O21.KHCL.1\tĐồ họa máy tính (TH - HT2)\t1\tCáp Phạm Đình Thăng\tThứ * Tiết *\tPhòng *",
//     "3\tCS117\tCS117.O21\tTư duy tính toán\t3\tNgô Đức Thành\tThứ 6 Tiết 678\tPhòng C214",
//     "4\tCS117\tCS117.O21.1\tTư duy tính toán (TH - HT2)\t1\tNgô Đức Thành\tThứ * Tiết *\tPhòng *",
//     "5\tNT213\tNT213.O22.ATCL\tBảo mật web và ứng dụng\t2\tNghi Hoàng Khoa\tThứ 6 Tiết 23\tPhòng C301",
//     "6\tNT213\tNT213.O22.ATCL.1\tBảo mật web và ứng dụng (TH - HT1)\t1\tNgô Đức Hoàng Sơn\tThứ 5 Tiết 12345\tPhòng B4.06",
//     "7\tNT230\tNT230.O21.ATCL\tCơ chế hoạt động của mã độc\t2\tPhạm Văn Hậu\nPhan Thế Duy\tThứ 3 Tiết 23\tPhòng C212",
//     "8\tNT230\tNT230.O21.ATCL.1\tCơ chế hoạt động của mã độc (TH - HT1)\t1\tTô Trọng Nghĩa\tThứ 3 Tiết 67890\tPhòng B4.08",
//     "9\tSE334\tSE334.O21.PMCL\tCác phương pháp lập trình\t2\tHuỳnh Tuấn Anh\tThứ 7 Tiết 1234\tPhòng B4.10",
//     "10\tSE334\tSE334.O21.PMCL.1\tCác phương pháp lập trình (TH - HT2)\t1\tHuỳnh Tuấn Anh\tThứ * Tiết *\tPhòng *"
// ];
//
// inputStrings.forEach(inputString => {
//     try {
//         const courseInfo = parseCourseInfo(inputString);
//         console.log(courseInfo);
//     } catch (e) {
//         console.error(e.message);
//     }
// });




export const maLop2LichThi = (maLop, lichthibody) => {
    // console.log(maLop);
    const dataArray = Object.values(lichthibody);
    console.log("lichthibody: ", dataArray);
    // Filter the array to find matching "MaLop"
    const result = dataArray.filter(item => item.MaLop === maLop);
    console.log(`malop: ${maLop}, malop2lichthi: ${result}`);
    return result;
}


/* the example use code 

    // NOTE: this malop is gonna be stored in the frontend localstorage
    const maLop = [
        "CS105.O21.KHCL", 
        "NT213.O22.ATCL", 
        "SOMETHINGELSE", 
        "SOMETHINGELSE", 
        "SOMETHINGELSE", 
    ]; 

    let matchingObjects = [];
    maLop.forEach(ml => {
        const matches = maLop2LichThi(ml);
        if (matches.length > 0) {
            matchingObjects = matchingObjects.concat(matches);
        }
    });
*/
