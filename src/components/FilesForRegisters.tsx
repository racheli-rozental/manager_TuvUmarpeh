// import  {  useEffect, useState } from 'react';
// import { Button, Typography, Container, List, ListItem, ListItemText, CircularProgress, Alert, Box, Modal, Paper, Divider } from '@mui/material';
// import { PDFDocument } from 'pdf-lib';

// const UserFiles = ({ activityId }: { activityId: string }) => {
//   const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
//   const [files, setFiles] = useState<{ [key: string]: any[] }>({});
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentCategory, setCurrentCategory] = useState<string | null>(null);
//   const [buttonsVisible, setButtonsVisible] = useState<boolean>(false);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);

//   // Fetch registered children for the activity
//   useEffect(() => {
//     const fetchRegisteredChildren = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`https://server-react-tovumarpeh.onrender.com/enrollments/${activityId}`);
//         const data = await response.json();
//         setRegisteredChildren(data);
//       } catch (error) {
//         setError('Error fetching registered children. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRegisteredChildren();
//   }, [activityId]);

//   const fetchFilesForChildren = async () => {
//     if (registeredChildren.length === 0) {
//       setError('No registered children found.');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const filePromises = registeredChildren.map(async (child: any) => {
//         if (!child.idNumber) return { childId: null, files: [] };

//         const response = await fetch(`https://server-react-tovumarpeh.onrender.com/file/${child.idNumber}`);
//         const data = await response.json();
//         return { childId: child.idNumber, files: [data] };
//       });

//       const results = await Promise.all(filePromises);
//       const filesByChild = results.reduce((acc, { childId, files }) => {
//         if (childId) acc[childId] = files;
//         return acc;
//       }, {} as { [key: string]: any[] });

//       setFiles(filesByChild);
//       setButtonsVisible(true);
//     } catch (error) {
//       setError('Error fetching files. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShowFiles = () => {
//     setCurrentCategory(null);
//     fetchFilesForChildren();
//   };

//   const handleViewFile = (fileUrl: string) => {
//     setCurrentFileUrl(fileUrl);
//     setOpenModal(true);
//   };

//   const handlePrintAllFiles = async (category: string) => {
//     try {
//       const filesToPrint = Object.entries(files).flatMap(([, childFiles]) =>
//         childFiles.filter((file) => file[category])
//       );

//       if (filesToPrint.length === 0) {
//         alert(`No ${category} files found.`);
//         return;
//       }

//       const mergedPdf = await PDFDocument.create();
//       for (const file of filesToPrint) {
//         const fileUrl = file[category];
//         const response = await fetch(fileUrl);
//         const fileBlob = await response.blob();
//         const fileArrayBuffer = await fileBlob.arrayBuffer();
//         const pdfToMerge = await PDFDocument.load(fileArrayBuffer);
//         const copiedPages = await mergedPdf.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
//         copiedPages.forEach((page) => mergedPdf.addPage(page));
//       }

//       const mergedPdfBytes = await mergedPdf.save();
//       const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
//       const blobUrl = URL.createObjectURL(blob);
//       window.open(blobUrl, '_blank');
//     } catch (error) {
//       alert(`Failed to print ${category} files.`);
//     }
//   };

//   if (loading) {
//     return <Box display="flex" justifyContent="center"><CircularProgress size={60} color="secondary" /></Box>;
//   }

//   return (
//     <Container maxWidth="lg" sx={{ paddingTop: '120px' }}>
//       {error && <Alert severity="error" sx={{ marginBottom: 3 }}>{error}</Alert>}

//       <Box sx={{ marginBottom: 4 }}>
//         {Object.keys(files).length > 0 && currentCategory && (
//           <Paper sx={{ padding: 4, boxShadow: 3, borderRadius: 2 }}>
//             <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
//               {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
//             </Typography>
//             <Button
//               variant="contained"
//               color="secondary"
//               sx={{ marginBottom: 2, borderRadius: 20 }}
//               onClick={() => handlePrintAllFiles(currentCategory)}
//             >
//               Print All {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
//             </Button>
//             <Divider sx={{ marginBottom: 2 }} />
//             {Object.entries(files).map(([childId, childFiles]) => (
//               <div key={childId}>
//                 <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 500 }}>
//                   Child {childId}
//                 </Typography>
//                 <List>
//                   {childFiles.map((file, index) => (
//                     file[currentCategory] ? (
//                       <ListItem key={index} sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
//                         <ListItemText primary={`${currentCategory} file available.`} />
//                         <Button
//                           variant="outlined"
//                           color="primary"
//                           onClick={() => handleViewFile(file[currentCategory])}
//                           sx={{ borderRadius: 20 }}
//                         >
//                           View
//                         </Button>
//                       </ListItem>
//                     ) : (
//                       <ListItem key={index} sx={{ borderBottom: 1, borderColor: 'grey.300' }}>
//                         <ListItemText primary={`No ${currentCategory} file for this child.`} />
//                       </ListItem>
//                     )
//                   ))}
//                 </List>
//               </div>
//             ))}
//           </Paper>
//         )}
//       </Box>

//       <Box
//         sx={{
//           position: 'fixed',
//           top: '90px',
//           right: '20px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 2,
//           zIndex: 10,
//         }}
//       >
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={handleShowFiles}
//           sx={{ borderRadius: '8px', width: '250px' }}
//         >
//           Load Files
//         </Button>

//         {buttonsVisible && (
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//             <Button variant="contained" color="primary" onClick={() => setCurrentCategory('medications')} sx={{ borderRadius: 20 }}>
//               Show Medications
//             </Button>
//             <Button variant="contained" color="primary" onClick={() => setCurrentCategory('agreement')} sx={{ borderRadius: 20 }}>
//               Show Agreements
//             </Button>
//             <Button variant="contained" color="primary" onClick={() => setCurrentCategory('personalDetails')} sx={{ borderRadius: 20 }}>
//               Show Personal Details
//             </Button>
//             <Button variant="contained" color="primary" onClick={() => setCurrentCategory('identity')} sx={{ borderRadius: 20 }}>
//               Show Identity
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: '80%',
//             height: '80%',
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             borderRadius: 3,
//             p: 4,
//             overflow: 'auto',
//           }}
//         >
//           {currentFileUrl ? (
//             <iframe
//               src={currentFileUrl}
//               title="File Viewer"
//               width="100%"
//               height="100%"
//               style={{ border: 'none', borderRadius: 10 }}
//             />
//           ) : (
//             <Typography>No file selected</Typography>
//           )}
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default UserFiles;
import { useEffect, useState } from 'react';
import {
  Button, Typography, Container, List, ListItem, ListItemText, CircularProgress,
  Alert, Box, Modal, Paper, Divider, Stack
} from '@mui/material';
import { PDFDocument } from 'pdf-lib';

const UserFiles = ({ activityId }: { activityId: string }) => {
  const [registeredChildren, setRegisteredChildren] = useState<any[]>([]);
  const [files, setFiles] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [buttonsVisible, setButtonsVisible] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegisteredChildren = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://server-react-tovumarpeh.onrender.com/enrollments/${activityId}`);
        const data = await response.json();
        setRegisteredChildren(data);
      } catch (error) {
        setError('שגיאה בטעינת הילדים הרשומים. נסה שוב מאוחר יותר.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegisteredChildren();
  }, [activityId]);

  const fetchFilesForChildren = async () => {
    if (registeredChildren.length === 0) {
      setError('לא נמצאו ילדים רשומים.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const filePromises = registeredChildren.map(async (child: any) => {
        if (!child.idNumber) return { childId: null, files: [] };
        const response = await fetch(`https://server-react-tovumarpeh.onrender.com/file/${child.idNumber}`);
        const data = await response.json();
        return { childId: child.idNumber, files: [data] };
      });
      const results = await Promise.all(filePromises);
      const filesByChild = results.reduce((acc, { childId, files }) => {
        if (childId) acc[childId] = files;
        return acc;
      }, {} as { [key: string]: any[] });
      setFiles(filesByChild);
      setButtonsVisible(true);
    } catch (error) {
      setError('שגיאה בטעינת הקבצים. נסה שוב מאוחר יותר.');
    } finally {
      setLoading(false);
    }
  };

  const handleShowFiles = () => {
    setCurrentCategory(null);
    fetchFilesForChildren();
  };

  const handleViewFile = (fileUrl: string) => {
    setCurrentFileUrl(fileUrl);
    setOpenModal(true);
  };

  const handlePrintAllFiles = async (category: string) => {
    try {
      const filesToPrint = Object.entries(files).flatMap(([, childFiles]) =>
        childFiles.filter((file) => file[category])
      );
      if (filesToPrint.length === 0) {
        alert(`לא נמצאו קבצי ${category}.`);
        return;
      }
      const mergedPdf = await PDFDocument.create();
      for (const file of filesToPrint) {
        const fileUrl = file[category];
        const response = await fetch(fileUrl);
        const fileBlob = await response.blob();
        const fileArrayBuffer = await fileBlob.arrayBuffer();
        const pdfToMerge = await PDFDocument.load(fileArrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfToMerge, pdfToMerge.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (error) {
      alert(`הדפסת קבצי ${category} נכשלה.`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={60} color="secondary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ pt: 6, direction: 'rtl' }}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4, boxShadow: 3 }}>
        <Typography variant="h5" color="primary" fontWeight={700} mb={2} textAlign="right">
          קבצים לכל ילד בפעילות
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Stack direction="row" spacing={2} justifyContent="flex-end" mb={3}>
          <Button
            variant="contained"
            color="info"
            onClick={handleShowFiles}
            sx={{ borderRadius: 3, fontWeight: 600, minWidth: 120 }}
          >
            טען קבצים
          </Button>
          {buttonsVisible && (
            <>
              <Button variant="contained" color="secondary" onClick={() => setCurrentCategory('medications')} sx={{ borderRadius: 3, fontWeight: 600 }}>
                תרופות
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setCurrentCategory('agreement')} sx={{ borderRadius: 3, fontWeight: 600 }}>
                הסכמות
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setCurrentCategory('personalDetails')} sx={{ borderRadius: 3, fontWeight: 600 }}>
                פרטים אישיים
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setCurrentCategory('identity')} sx={{ borderRadius: 3, fontWeight: 600 }}>
                תעודת זהות
              </Button>
            </>
          )}
        </Stack>

        {Object.keys(files).length > 0 && currentCategory && (
          <Box>
            <Typography variant="h6" color="primary" fontWeight={600} mb={2} textAlign="right">
              {(() => {
                switch (currentCategory) {
                  case 'medications': return 'קבצי תרופות';
                  case 'agreement': return 'קבצי הסכמות';
                  case 'personalDetails': return 'קבצי פרטים אישיים';
                  case 'identity': return 'קבצי תעודת זהות';
                  default: return currentCategory;
                }
              })()}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mb: 2, borderRadius: 3, fontWeight: 600 }}
              onClick={() => handlePrintAllFiles(currentCategory)}
            >
              הדפס את כל הקבצים
            </Button>
            <Divider sx={{ mb: 2 }} />
            {Object.entries(files).map(([childId, childFiles]) => (
              <Box key={childId} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight={500} color="text.secondary" mb={1} textAlign="right">
                  ילד: {childId}
                </Typography>
                <List sx={{ bgcolor: '#f8fafd', borderRadius: 2 }}>
                  {childFiles.map((file, index) => (
                    file[currentCategory] ? (
                      <ListItem key={index} sx={{ borderBottom: 1, borderColor: 'grey.200', py: 1.5 }}>
                        <ListItemText primary="קובץ זמין" sx={{ textAlign: 'right' }} />
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleViewFile(file[currentCategory])}
                          sx={{ borderRadius: 3, fontWeight: 600 }}
                        >
                          צפייה
                        </Button>
                      </ListItem>
                    ) : (
                      <ListItem key={index} sx={{ borderBottom: 1, borderColor: 'grey.100', py: 1.5 }}>
                        <ListItemText primary="אין קובץ עבור ילד זה" sx={{ textAlign: 'right', color: 'gray' }} />
                      </ListItem>
                    )
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '80%', md: '70%' },
            height: { xs: '80%', sm: '80%', md: '80%' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
            p: 2,
            overflow: 'auto',
            direction: 'rtl'
          }}
        >
          {currentFileUrl ? (
            <iframe
              src={currentFileUrl}
              title="File Viewer"
              width="100%"
              height="100%"
              style={{ border: 'none', borderRadius: 10 }}
            />
          ) : (
            <Typography align="center">לא נבחר קובץ</Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default UserFiles;