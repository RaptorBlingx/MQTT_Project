# MQTT_Project

## Description

This project is a part of my summer internship at ProdIoT. The goal of this project is to enhance the security, manageability, and scalability of the MQTT broker setup used by ProdIoT. This is achieved by implementing dynamic credential generation and Access Control Lists (ACLs) for each application, along with monitoring and logging of activities.

## Features

- Dynamic generation of unique MQTT credentials for each application
- Implementation of ACLs to manage publish and subscribe permissions
- Logging and monitoring of application activities
- User registration and application creation APIs
- Secure and manageable MQTT communication

## Setup

### Prerequisites

- Node.js
- PostgreSQL
- Mosquitto MQTT Broker

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/MQTT_Project.git
    cd MQTT_Project
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the PostgreSQL database:

    - Create a new PostgreSQL database.
    - Update the database configuration in your application.

4. Configure Mosquitto:

    - Install Mosquitto and set up the necessary configuration files (`mosquitto.conf`, `passwd`, `acl`).

### Running the Project

1. Start the PostgreSQL database.

2. Start the Mosquitto MQTT Broker.

3. Start the Node.js application:

    ```bash
    node app.js
    ```

### API Endpoints

- **User Registration**: `/register`
- **Application Creation**: `/create_application`
- **Update ACL**: `/mqtt/update_acl`

### Testing

Use tools like Postman to test the API endpoints and MQTT Explorer to test MQTT communication.

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
