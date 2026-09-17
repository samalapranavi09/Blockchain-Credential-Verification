// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CredentialRegistry {

    struct Credential {
        string credentialId;
        string certificateHash;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Credential) private credentials;

    event CredentialStored(
        string credentialId,
        string certificateHash,
        uint256 timestamp
    );

    function storeCredential(
        string memory credentialId,
        string memory certificateHash
    ) public {

        require(
            !credentials[credentialId].exists,
            "Credential already exists"
        );

        credentials[credentialId] = Credential(
            credentialId,
            certificateHash,
            block.timestamp,
            true
        );

        emit CredentialStored(
            credentialId,
            certificateHash,
            block.timestamp
        );
    }

    function verifyCredential(
        string memory credentialId
    )
        public
        view
        returns (
            bool exists,
            string memory certificateHash,
            uint256 timestamp
        )
    {
        Credential memory credential = credentials[credentialId];

        return (
            credential.exists,
            credential.certificateHash,
            credential.timestamp
        );
    }
}