package model;

public class User
{
    private String name;
    private String email;
    private String password;
    private String birthDay;
    private String birthMonth;
    private String birthYear;
    private String firstName;
    private String lastName;
    private String company;
    private String address1;
    private String address2;
    private String country;
    private String state;
    private String city;
    private String zipCode;
    private String mobileNumber;

    // private constructor to enforce the use of the Builder
    private User()
    {

    }

    public String getName()
    {
        return name;
    }

    public String getEmail()
    {
        return email;
    }

    public String getPassword()
    {
        return password;
    }

    public String getBirthDay()
    {
        return birthDay;
    }

    public String getBirthMonth()
    {
        return birthMonth;
    }

    public String getBrithYear()
    {
        return birthYear;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public String getCompany()
    {
        return company;
    }

    public String getAddress1()
    {
        return address1;
    }

    public String getAddress2()
    {
        return address2;
    }

    public String getCountry()
    {
        return country;
    }

    public String getState()
    {
        return state;
    }

    public String getCity()
    {
        return city;
    }

    public String getZipCode()
    {
        return zipCode;
    }

    public String getMobileNumber()
    {
        return mobileNumber;
    }

    public static class Builder
    {
        private final User user;

        public Builder()
        {
            user = new User();
        }

        public Builder withName(String name)
        {
            user.name = name;
            return this;
        }

        public Builder withEmail(String email)
        {
            user.email = email;
            return this;
        }

        public Builder withPassword(String password)
        {
            user.password = password;
            return this;
        }

        public Builder withBirthDate(String day, String month, String year)
        {
            user.birthDay = day;
            user.birthMonth = month;
            user.birthYear = year;
            return this;
        }

        public Builder withFirstName(String firstName)
        {
            user.firstName = firstName;
            return this;
        }

        public Builder withLastName(String lastName)
        {
            user.lastName = lastName;
            return this;
        }

        public Builder withCompany(String company)
        {
            user.company = company;
            return this;
        }

        public Builder withAddress1(String address1)
        {
            user.address1 = address1;
            return this;
        }

        public Builder withAddress2(String address2)
        {
            user.address2 = address2;
            return this;
        }

        public Builder withCountry(String country)
        {
            user.country = country;
            return this;
        }

        public Builder withState(String state)
        {
            user.state = state;
            return this;
        }

        public Builder withCity(String city)
        {
            user.city = city;
            return this;
        }

        public Builder withZipCode(String zipCode)
        {
            user.zipCode = zipCode;
            return this;
        }

        public Builder withMobileNumber(String mobileNumber)
        {
            user.mobileNumber = mobileNumber;
            return this;
        }

        // build method to return the constructed User object
        public User build()
        {
            return user;
        }
    }
}

