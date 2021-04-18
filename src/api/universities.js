import { format } from '../utils/string'
import { apiCall, ENDPOINTS } from './api-requests'

/**
 * Gets the list of the available universities
 * @returns The list of universities
 */
export const getUniversities = async () => {
  const url = ENDPOINTS.UNIVERSITIES
  return apiCall(url)
}

/**
 * Gets the list of departments for a university
 * @param {string} univeristyId
 * @returns The list of departments in a university
 */
export const getUniversityDepartments = async (universityId) => {
  const url = format(ENDPOINTS.DEPARTMENTS, universityId)
  return apiCall(url)
}

/**
 * Gets the list of courses for a university's department
 * @param {string} departmentId
 * @returns The list of courses in a university
 */
export const getDepartmentCourses = async (departmentId) => {
  const url = format(ENDPOINTS.COURSES, departmentId)
  return apiCall(url)
}
