const express = require("express");
const {getProfile, updateProfile, deleteProfile, updatePassword, getHistory, deleteHistory } = require('../Controllers/user');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: API endpoints for accessing, updating or deleting authorized user info
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier for the user
 *         fullName:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's hashed password (never returned in responses)
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The time the user was created
 *         __v:
 *           type: integer
 *           description: Version key for internal MongoDB use
 *         isDeleted:
 *           type: boolean
 *           description: Indicates whether the user has been deleted
 *       required:
 *         - _id
 *         - fullName
 *         - email
 *         - timestamp
 *         - isDeleted
 *       example:
 *         _id: "677c2421c1cb1416131b867f"
 *         fullName: "Muazzam Khan"
 *         email: "test2@gmail.com"
 *         password: "$2a$10$VD3uZvB1G44Lwgy2.8UYqORQyAP.tDjv1XE7zjpPkZ75INq1Wi/je"
 *         timestamp: "2025-01-06T18:42:41.908Z"
 *         __v: 0
 *         isDeleted: false
 */

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Get the profile of a logged-in user
 *     tags: [User]
 *     description: This endpoint retrieves the profile of the currently logged-in user. Authentication is managed using a JWT stored in cookies.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Referencing the 'User' schema defined earlier
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   description: The error message
 *             example:
 *               success: false
 *               error: "User not found"
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
 *                   description: Error message
 *             example:
 *               success: false
 *               error: "Internal server error occurred"
 */

// ROUTE 1:  Endpoint for getting a user using GET /api/user/. Login required
router.get('/', getProfile);

/**
 * @swagger
 * /api/user/:
 *   put:
 *     summary: Update the profile of a logged-in user
 *     tags: [User]
 *     description: This endpoint allows the logged-in user to update their profile, including their name and email. Authentication is managed using a JWT stored in cookies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's new name
 *               email:
 *                 type: string
 *                 description: The user's new email
 *             example:
 *               name: "Muazzam Khan"
 *               email: "muazzam.khan@example.com"
 *     responses:
 *       201:
 *         description: Successfully updated the user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Referring to the User schema for the updated user object
 *       400:
 *         description: Bad request. No data provided to update or invalid input.
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
 *               error: "No data provided to update."
 *       404:
 *         description: User not found or user is deleted
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
 *               error: "User not found."
 *       500:
 *         description: Internal server error
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
 *               success: false
 *               message: "Internal server error."
 */

// ROUTE 2:  Endpoint for updating a user using PUT /api/user/. Login required
router.put('/', updateProfile);


/**
 * @swagger
 * /api/user/:
 *   delete:
 *     summary: Soft delete the profile of a logged-in user
 *     tags: [User]
 *     description: This endpoint allows the logged-in user to soft delete their profile (mark as deleted without actually removing it from the database). Authentication is managed using a JWT stored in cookies.
 *     security:
 *       - cookieAuth: []  # Assuming authentication is handled via cookies
 *     responses:
 *       200:
 *         description: Successfully soft-deleted the user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'  # Referring to the User schema to show the updated user object
 *       404:
 *         description: User not found or user is already deleted
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
 *               error: "User not found."
 *       500:
 *         description: Internal server error
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
 *               success: false
 *               message: "Internal server error."
 */

// ROUTE 3:  Endpoint for deleting a user using DELETE /api/user/. Login required
router.delete('/', deleteProfile);


/**
 * @swagger
 * /api/user/password/:
 *   patch:
 *     summary: Update the password of a logged-in user
 *     tags: [User]
 *     description: This endpoint allows a logged-in user to update their password. The user must provide their old password and a new password that matches the confirmation password.
 *     security:
 *       - cookieAuth: []  # Assuming authentication is handled via cookies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 description: The new password the user wants to set
 *               matchPassword:
 *                 type: string
 *                 description: Confirmation of the new password (must match `newPassword`)
 *             example:
 *               oldPassword: "OldPass123!"
 *               newPassword: "NewSecurePass123!"
 *               matchPassword: "NewSecurePass123!"
 *     responses:
 *       200:
 *         description: Password updated successfully
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
 *               message: "Password updated successfully."
 *       400:
 *         description: Bad request (e.g., incorrect old password or passwords don’t match)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             examples:
 *               IncorrectOldPassword:
 *                 value:
 *                   success: false
 *                   error: "Incorrect old password."
 *               PasswordMismatch:
 *                 value:
 *                   success: false
 *                   error: "Passwords don't match."
 *       404:
 *         description: User not found or user is deleted
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
 *               error: "User not found."
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
 *               error: "Internal server error occurred."
 */

// ROUTE 4:  Endpoint for updating password using PATCH /api/user/password/. Login required
router.patch('/password/', updatePassword);

/**
 * @swagger
 * /api/user/history:
 *   get:
 *     summary: Get search history of the logged-in user
 *     tags: [User]
 *     description: Retrieves the search history of the authenticated user. Authentication is required and managed via JWT stored in cookies.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's search history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       country:
 *                         type: string
 *                         example: "PAK"
 *                       gas:
 *                         type: string
 *                         example: "co2"
 *                       sector:
 *                         type: string
 *                         example: "agriculture"
 *                       year:
 *                         type: integer
 *                         example: 2025
 *                       lat:
 *                         type: number
 *                         example: 33.6844
 *                       lot:
 *                         type: number
 *                         example: 73.0479
 *       404:
 *         description: User not found
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
 *               error: "User not found"
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
 *               error: "Internal server error occured"
 */

// ROUTE 5:  Endpoint for getting user history using GET /api/user/history. Login required
router.get('/history', getHistory);

/**
 * @swagger
 * /api/user/history/{historyId}:
 *   delete:
 *     summary: Delete a specific history item from the logged-in user's history
 *     tags: [User]
 *     description: Deletes a single history entry for the currently authenticated user, identified by the `historyId`. Requires user to be logged in via JWT in cookies.
 *     parameters:
 *       - in: path
 *         name: historyId
 *         required: true
 *         description: The ID of the history item to be deleted
 *         schema:
 *           type: string
 *           example: 6640188e4bff4f42c2a8a7f3
 *     responses:
 *       200:
 *         description: Successfully deleted the history item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6640188e4bff4f42c2a8a7f4"
 *                       country:
 *                         type: string
 *                         example: "PAK"
 *                       gas:
 *                         type: string
 *                         example: "co2"
 *                       sector:
 *                         type: string
 *                         example: "agriculture"
 *                       year:
 *                         type: integer
 *                         example: 2025
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-05-11T12:34:56.789Z"
 *       404:
 *         description: User not found
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
 *               error: "User not found."
 *       500:
 *         description: Internal server error
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
 *               success: false
 *               message: "Internal server error."
 */

// ROUTE 6:  Endpoint for deleting a user history using DELETE /api/user/history/:historyId. Login required
router.delete('/history/:historyId', deleteHistory);

module.exports = router;