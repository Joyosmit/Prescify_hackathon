// pragma solidity ^0.8.19;

// contract HealthChain {
//     address public admin; // Contract deployer

//     struct Doctor {
//         bool exists;
//         bool verified;
//         address verifier;
//         string ipfsHash; // Doctor's verification details on IPFS
//     }

//     struct Prescription {
//         address doctor;
//         address patient;
//         string prescriptionIPFS;
//         bool dispensed;
//         address pharmacist;
//         string dispensedIPFS; // Pharmacist's verification details on IPFS
//     }

//     mapping(address => Doctor) public doctors;
//     mapping(uint256 => Prescription) public prescriptions;
//     uint256 public prescriptionCount;
//     string public doctorVerifierIPFS;

//     event DoctorRegistered(address indexed doctor);
//     event DoctorVerified(address indexed doctor, address indexed verifier, string ipfsHash);
//     event PrescriptionIssued(uint256 indexed prescriptionId, address indexed doctor, address indexed patient, string ipfsHash);
//     event PrescriptionDispensed(uint256 indexed prescriptionId, address indexed pharmacist, string ipfsHash);

//     constructor(string memory _doctorVerifierIPFS) {
//         admin = msg.sender;
//         doctorVerifierIPFS = _doctorVerifierIPFS;
//     }

//     // ---- Doctor Registration and Verification ----
//     function getDoctorByAddress(address _doctor) external view returns (Doctor memory) {
//         return doctors[_doctor];
//     }
//     function registerDoctor() external {
//         require(!doctors[msg.sender].exists, "Already registered");

//         doctors[msg.sender] = Doctor(true, false, address(0), "");
//         emit DoctorRegistered(msg.sender);
//     }

//     function verifyDoctor(address _doctor) external {
//         require(doctors[_doctor].exists, "Doctor not registered");
//         require(!doctors[_doctor].verified, "Already verified");

//         doctors[_doctor].verified = true;
//         doctors[_doctor].verifier = msg.sender;

//         emit DoctorVerified(_doctor, msg.sender);
//     }

//     function isDoctorVerified(address _doctor) external view returns (bool) {
//         return doctors[_doctor].verified;
//     }

//     // ---- Prescription Management ----

//     function issuePrescription(address _patient, string memory _prescriptionIPFS) external {
//         require(doctors[msg.sender].verified, "Only verified doctors can issue prescriptions");

//         prescriptionCount++;
//         prescriptions[prescriptionCount] = Prescription(msg.sender, _patient, _prescriptionIPFS, false, address(0), "");

//         emit PrescriptionIssued(prescriptionCount, msg.sender, _patient, _prescriptionIPFS);
//     }

//     function dispensePrescription(uint256 _prescriptionId, string memory _dispensedIPFS) external {
//         require(!prescriptions[_prescriptionId].dispensed, "Prescription already dispensed");

//         prescriptions[_prescriptionId].dispensed = true;
//         prescriptions[_prescriptionId].pharmacist = msg.sender;
//         prescriptions[_prescriptionId].dispensedIPFS = _dispensedIPFS;

//         emit PrescriptionDispensed(_prescriptionId, msg.sender, _dispensedIPFS);
//     }

//     function getPrescription(uint256 _prescriptionId) external view returns (Prescription memory) {
//         return prescriptions[_prescriptionId];
//     }

//     function getDoctorVerifierList() external view returns (string memory) {
//         return doctorVerifierIPFS;
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HealthChain {
    address public admin; // Contract deployer

    struct Doctor {
        bool exists;
        bool verified;
        address[] verifier;
        string ipfsHash; // Doctor's verification details on IPFS
    }

    struct Pharmacist {
        bool exists;
        bool verified;
        address[] verifier;
        string ipfsHash; // Pharmacist's verification details on IPFS
    }

    struct Prescription {
        address doctor;
        string patientHash;
        string prescriptionIPFS;
        bool dispensed;
        address pharmacist;
        string dispensedIPFS; // Pharmacist's verification details on IPFS
    }

    mapping(address => Doctor) public doctors;
    mapping(address => Pharmacist) public pharmacists;
    mapping(uint256 => Prescription) public prescriptions;
    mapping(string => string[]) public patientPrescriptions; // Mapping of patientHash to an array of IPFS hashes
    uint256 public prescriptionCount;
    // IPFS Hashes for Verifier Lists
    string public doctorVerifierListIPFS; // List of medical doctor verifiers
    string public pharmacyVerifierListIPFS; // List of pharmacy verifiers

    event DoctorRegistered(address indexed doctor);
    event DoctorVerified(address indexed doctor, address indexed verifier);
    event PharmacistRegistered(address indexed pharmacist);
    event PharmacistVerified(address indexed pharmacist, address indexed verifier);
    event PrescriptionIssued(
        uint256 indexed prescriptionId,
        address indexed doctor,
        string indexed patientHash,
        string ipfsHash
    );
    event PrescriptionDispensed(
        uint256 indexed prescriptionId,
        address indexed pharmacist,
        string ipfsHash
    );
    event VerifierListUpdated(string verifierType, string newIPFSHash);

    constructor(string memory _initialDoctorVerifierListIPFS, string memory _initialPharmacyVerifierListIPFS) {
        doctorVerifierListIPFS = _initialDoctorVerifierListIPFS;
        pharmacyVerifierListIPFS = _initialPharmacyVerifierListIPFS;
        admin = msg.sender;
    }

    // ---- Doctor and Pharmacist Registration and Verification ----
    modifier onlyOwner() {
        require(msg.sender == admin, "Only owner can call this function");
        _;
    }

    function registerDoctor(
        string memory _ipfsHash
    ) external returns (Doctor memory) {
        require(!doctors[msg.sender].exists, "Already registered");

        doctors[msg.sender] = Doctor(true, false, new address[](0), _ipfsHash);
        emit DoctorRegistered(msg.sender);
        return doctors[msg.sender];
    }

    function verifyDoctor(address _doctor) external {
        require(doctors[_doctor].exists, "Doctor not registered");
        require(!doctors[_doctor].verified, "Already verified");
        require(_doctor != msg.sender, "Cannot verify self");

        for (uint i = 0; i < doctors[_doctor].verifier.length; i++) {
            require(
                doctors[_doctor].verifier[i] != msg.sender,
                "Already verified by this verifier"
            );
        }

        doctors[_doctor].verified = true;
        doctors[_doctor].verifier.push(msg.sender);
        emit DoctorVerified(_doctor, msg.sender);
    }

    function registerPharmacist(
        string memory _ipfsHash
    ) external returns (Pharmacist memory) {
        require(!pharmacists[msg.sender].exists, "Already registered");

        pharmacists[msg.sender] = Pharmacist(true, false, new address[](0), _ipfsHash);
        emit PharmacistRegistered(msg.sender);
        return pharmacists[msg.sender];
    }

    function verifyPharmacist(address _pharmacist) external {
        require(pharmacists[_pharmacist].exists, "Pharmacist not registered");
        require(!pharmacists[_pharmacist].verified, "Already verified");
        require(_pharmacist != msg.sender, "Cannot verify self");

        for (uint i = 0; i < pharmacists[_pharmacist].verifier.length; i++) {
            require(
                pharmacists[_pharmacist].verifier[i] != msg.sender,
                "Already verified by this verifier"
            );
        }

        pharmacists[_pharmacist].verified = true;
        pharmacists[_pharmacist].verifier.push(msg.sender);
        emit PharmacistVerified(_pharmacist, msg.sender);
    }

    function isDoctorVerified(address _doctor) external view returns (bool) {
        return doctors[_doctor].verified;
    }

    function isPharmacistVerified(address _pharmacist) external view returns (bool) {
        return pharmacists[_pharmacist].verified;
    }

    // ---- Prescription Management ----
    function issuePrescription(
        string memory _patientHash,
        string memory _prescriptionIPFS
    ) external returns(uint256) {
        require(
            doctors[msg.sender].verified,
            "Only verified doctors can issue prescriptions"
        );

        prescriptionCount++;
        prescriptions[prescriptionCount] = Prescription(
            msg.sender,
            _patientHash,
            _prescriptionIPFS,
            false,
            address(0),
            ""
        );
        patientPrescriptions[_patientHash].push(_prescriptionIPFS);

        emit PrescriptionIssued(
            prescriptionCount,
            msg.sender,
            _patientHash,
            _prescriptionIPFS
        );
        return prescriptionCount;
    }

    function dispensePrescription(
        uint256 _prescriptionId,
        string memory _dispensedIPFS
    ) external {
        require(
            !prescriptions[_prescriptionId].dispensed,
            "Prescription already dispensed"
        );
        require(
            pharmacists[msg.sender].verified,
            "Only verified pharmacists can dispense prescriptions"
        );

        prescriptions[_prescriptionId].dispensed = true;
        prescriptions[_prescriptionId].pharmacist = msg.sender;
        prescriptions[_prescriptionId].dispensedIPFS = _dispensedIPFS;

        emit PrescriptionDispensed(_prescriptionId, msg.sender, _dispensedIPFS);
    }

    // ---- Owner-Only Functions for Verifier List Management ----
    function updateDoctorVerifierList(
        string memory _newIPFSHash
    ) external onlyOwner {
        doctorVerifierListIPFS = _newIPFSHash;
        emit VerifierListUpdated("DoctorVerifierList", _newIPFSHash);
    }

    function updatePharmacyVerifierList(
        string memory _newIPFSHash
    ) external onlyOwner {
        pharmacyVerifierListIPFS = _newIPFSHash;
        emit VerifierListUpdated("PharmacyVerifierList", _newIPFSHash);
    }

    function getDoctorVerifierList() external view returns (string memory) {
        return doctorVerifierListIPFS;
    }

    function getPharmacyVerifierList() external view returns (string memory) {
        return pharmacyVerifierListIPFS;
    }

    function getPrescription(
        uint256 _prescriptionId
    ) external view returns (Prescription memory) {
        return prescriptions[_prescriptionId];
    }
}