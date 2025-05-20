const express = require("express");
const { register, login, forgotPassword, resetPassword } = require('../Controllers/auth');
// const fetchUser = require("../MiddleWares/fetchUser");

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: API endpoints for authentication related tasks
*/

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The user's full name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               fullName: Muazzam Khan
 *               email: muazzamkhan@gmail.com
 *               password: pass123
 *     responses:
 *       400:
 *         description: The email is already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: Email already in use
 *             example:
 *               success: false
 *               error: Email already in use
 *       201:
 *         description: The user has been created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     userId:
 *                       type: string
 *             example:
 *               success: true
 *               data:
 *                 name: Muazzam Khan
 *                 email: muazzamkhan@gmail.com
 *                 userId: 12345abcde
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: Internal server error occurred
 *             example:
 *               success: false
 *               error: Internal server error occurred
 */

// ROUTE 1:  Endpoint for adding a new user using POST /api/auth/signup. No login required
router.post('/signup', register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logging in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *               remember:
 *                 type: boolean
 *                 description: Specifies whether to remember the user or not
 *             example:
 *               email: muazzamkhan@gmail.com
 *               password: pass123
 *               remember: false
 *     responses:
 *       400:
 *         description: Incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: Incorrect credentials
 *       201:
 *         description: The user has logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     userId:
 *                       type: string
 *             example:
 *               success: true
 *               data:
 *                 name: Muazzam Khan
 *                 email: muazzamkhan@gmail.com
 *                 userId: 12345abcde
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: Internal server error occurred
 *             example:
 *               success: false
 *               error: Internal server error occurred
 */

// ROUTE 2:  Endpoint for logging in a user using POST /api/auth/login. No login required
router.post('/login', login);


/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *             example:
 *               email: muazzamkhan@gmail.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: Password reset email sent successfully.
 *       400:
 *         description: Invalid email or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: Failed to send reset email.
 */

// ROUTE 3:  Endpoint for forgot password using POST  /api/auth/forgot-password. No login required
router.post('/forgot-password', forgotPassword);


/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password using a token
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "d238b2def3f77f7c0409766515be6177edd30be9e7b0f27983df1a0ab8046519"
 *         description: Password reset token received via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *             example:
 *               password: NewSecurePass123!
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: Password reset successful.
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: Invalid or expired token.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               success: false
 *               error: Failed to reset password.
 */

// ROUTE 4:  Endpoint for reset password using POST  /api/auth/reset-password/:token. No login required
router.post('/reset-password/:token', resetPassword);

module.exports = router;