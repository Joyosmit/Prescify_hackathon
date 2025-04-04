// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HealthChain {
    address public admin; // Contract deployer

    struct Doctor {
        bool exists;
        bool verified;
        address verifier;
        string ipfsHash; // Doctor's verification details on IPFS
    }

    struct Prescription {
        address doctor;
        address patient;
        string prescriptionIPFS;
        bool dispensed;
        address pharmacist;
        string dispensedIPFS; // Pharmacist's verification details on IPFS
    }

    mapping(address => Doctor) public doctors;
    mapping(uint256 => Prescription) public prescriptions;
    uint256 public prescriptionCount;

    event DoctorRegistered(address indexed doctor);
    event DoctorVerified(address indexed doctor, address indexed verifier, string ipfsHash);
    event PrescriptionIssued(uint256 indexed prescriptionId, address indexed doctor, address indexed patient, string ipfsHash);
    event PrescriptionDispensed(uint256 indexed prescriptionId, address indexed pharmacist, string ipfsHash);

    constructor() {
        admin = msg.sender;
    }

    // ---- Doctor Registration and Verification ----

    function registerDoctor() external {
        require(!doctors[msg.sender].exists, "Already registered");

        doctors[msg.sender] = Doctor(true, false, address(0), "");
        emit DoctorRegistered(msg.sender);
    }

    function verifyDoctor(address _doctor, string memory _ipfsHash) external {
        require(doctors[_doctor].exists, "Doctor not registered");
        require(!doctors[_doctor].verified, "Already verified");

        doctors[_doctor].verified = true;
        doctors[_doctor].verifier = msg.sender;
        doctors[_doctor].ipfsHash = _ipfsHash;

        emit DoctorVerified(_doctor, msg.sender, _ipfsHash);
    }

    function isDoctorVerified(address _doctor) external view returns (bool) {
        return doctors[_doctor].verified;
    }

    // ---- Prescription Management ----

    function issuePrescription(address _patient, string memory _prescriptionIPFS) external {
        require(doctors[msg.sender].verified, "Only verified doctors can issue prescriptions");

        prescriptionCount++;
        prescriptions[prescriptionCount] = Prescription(msg.sender, _patient, _prescriptionIPFS, false, address(0), "");

        emit PrescriptionIssued(prescriptionCount, msg.sender, _patient, _prescriptionIPFS);
    }

    function dispensePrescription(uint256 _prescriptionId, string memory _dispensedIPFS) external {
        require(!prescriptions[_prescriptionId].dispensed, "Prescription already dispensed");

        prescriptions[_prescriptionId].dispensed = true;
        prescriptions[_prescriptionId].pharmacist = msg.sender;
        prescriptions[_prescriptionId].dispensedIPFS = _dispensedIPFS;

        emit PrescriptionDispensed(_prescriptionId, msg.sender, _dispensedIPFS);
    }

    function getPrescription(uint256 _prescriptionId) external view returns (Prescription memory) {
        return prescriptions[_prescriptionId];
    }
}