import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'
import { format } from '../utils/string'

export const ENDPOINTS = {
  UNIVERSITIES: `${BASE_URL}Universities/`,
  DEPARTMENTS: `${BASE_URL}Departments/ByUniversity/{0}`,
  COURSES: `${BASE_URL}Courses/ByDepartment/{0}`,
}

/**
 * Gets the list of the available universities
 * @returns The list of universities
 */
export const getUniversities = async () => {
  const url = ENDPOINTS.UNIVERSITIES

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) {
      return null
    }
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

/**
 * Gets the list of departments for a university
 * @param {string} univeristyId
 * @returns The list of departments in a university
 */
export const getUniversityDepartments = async (universityId) => {
  const url = format(ENDPOINTS.DEPARTMENTS, universityId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) {
      return null
    }
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

/**
 * Gets the list of departments for a university
 * @param {string} departmentId
 * @returns The list of departments in a university
 */
export const getDepartmentCourses = async (departmentId) => {
  const url = format(ENDPOINTS.COURSES, departmentId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) {
      return null
    }
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

// /**
//  * Gets the list of courses for a department in a university
//  * @param {string} departmentId
//  * @returns The list of courses in a departments in a university
//  */
// export const getCourses = async (universityId, deptId) => {
//   // TODO: CHANGE THE STR CONCATENTATION (should be something like universityId/deptId)
//   const url = format(ENDPOINTS.UNIVERSITIES, universityId)

//   try {
//     const resp = await axios.get(url)
//     if (resp?.status !== HTTP_STATUS_CODES.OK) {
//       return null
//     }
//     return resp.data
//   } catch (error) {
//     console.error(error)
//   }

//   return null
// }
