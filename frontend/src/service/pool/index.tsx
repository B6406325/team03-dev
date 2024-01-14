import { UserInterface } from "../../interface/pool";

const apiUrl = "http://localhost:8080";

const fetchJson = async (url: string, options: RequestInit = {}): Promise<any> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

const GetPackageInfo = async () => {
  const url = `${apiUrl}/packages`;
  const data = await fetchJson(url);
  return data?.data || false;
};

const GetUserInfo = async (id: any) => {
  try {
    const url = `${apiUrl}/userinfo/${id}`;
    const data = await fetchJson(url);
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("Failed to fetch user information");
  }
};

const GetUserPackageInfo = async (id: any) => {
  try {
    const url = `${apiUrl}/userpackage/${id}`;
    const data = await fetchJson(url);
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching user package information:", error);
    throw new Error("Failed to fetch user package information");
  }
};

const GetUserBill = async (id: any) => {
  try {
      const url = `${apiUrl}/userbill/${id}`;
      const data = await fetchJson(url);
      return data?.data || null;
  } catch (error) {
      console.error("Error fetching user package information:", error);
      throw new Error("Failed to fetch user package information");
  }
};


async function UpdateUser(data: UserInterface) {
  const userId = localStorage.getItem("UserID");

  if (!userId) {
    return { status: false, message: "User ID is not available" };
  }

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ID: parseInt(userId),
      Password: data.Password,
      Username: data.Username,
      Firstname: data.Firstname,
      Lastname: data.Lastname,
      Address: data.Address,
      Dob: data.Dob,
      GenderID: data.GenderID,
      PrefixID: data.PrefixID,
    }),
  };

  try {
    const url = `${apiUrl}/userinfo`;
    const responseData = await fetchJson(url, requestOptions);
    
    return { status: true, message: responseData.message };
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: false, message: "An error occurred while updating user information" };
  }
}

const CancelSubscription = async (userId: any) => {
  try {
      const response = await fetch(`${apiUrl}/cancel-subscription/${userId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
  } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new Error('Failed to cancel subscription');
  }
};

export {
  GetPackageInfo,
  GetUserInfo,
  UpdateUser,
  GetUserPackageInfo,
  CancelSubscription,
  GetUserBill,
};
