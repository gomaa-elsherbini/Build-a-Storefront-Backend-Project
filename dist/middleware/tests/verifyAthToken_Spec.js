"use strict";
// import {Request, Response, NextFunction,} from 'express';
// import jwt from 'jsonwebtoken'
// describe('Test verifyAuthToken middleware', () => {
//     it('expect verifyAuthToken to validate the request to have a correct token', (req: Request, res: Response, next: NextFunction): => {
//         try {
//             const authorizationHeader = req.headers.authorization as string
//             const token = authorizationHeader.split(' ')[1]
//             const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
//             if (!decoded)
//                 next();
//         } catch (error) {
//             res.status(401);
//             res.json('Access denied, invalid token');
//         }
//     })
// })
// //   }); {
// //       if (!jwt.verify(token, process.env.TOKEN_SECRET as string)) {
// //         expect(res.send('Request failed'));
// //       } else {
// //         if (contentHeader.toLowerCase() !== 'application/json') {
// //           expect(res.send(' content type not application/json '));
// //         } else {
// //           next();
// //         }
// //       }
// //     }
// //   });
// // });
