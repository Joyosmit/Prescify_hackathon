// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Prescription {
    struct PrescriptionData {
        string patientName;
        string doctorDID;
        string patientDID;
        string details;
        bool isVerified;
    }

    mapping(bytes32 => PrescriptionData) public prescriptions;

    event PrescriptionIssued(bytes32 indexed id, string patientName, string doctorDID, string patientDID, string details);
    event PrescriptionVerified(bytes32 indexed id);

    function issuePrescription(
        string memory _patientName,
        string memory _doctorDID,
        string memory _patientDID,
        string memory _details
    ) public returns (bytes32) {
        bytes32 id = keccak256(abi.encodePacked(_patientName, _doctorDID, _patientDID, block.timestamp));
        prescriptions[id] = PrescriptionData(_patientName, _doctorDID, _patientDID, _details, false);

        emit PrescriptionIssued(id, _patientName, _doctorDID, _patientDID, _details);
        return id;
    }

    function verifyPrescription(bytes32 _id) public {
        require(bytes(prescriptions[_id].patientName).length > 0, "Prescription not found");
        prescriptions[_id].isVerified = true;

        emit PrescriptionVerified(_id);
    }
}
