export const callEndpoint = async (query, options ={}) => {
  try {
     const queryUrl = 'https://svc.metrotransit.org/nextripv2/'+query
    const response = await fetch(queryUrl, options)
    const json = await response.json()
    if(response.status == 200 && json) {
      // return resonse if http status is 200 or else throw error.
      return json
    } else {
      const error = new Error(`${response.status} ${response.statusText}`)
      error.response = response
      throw error
    }
  } catch(error) {
      // log error to splunk or kibbana
      throw error
  }

}