package com.example.productionReceiptfinal.dto;

import lombok.Data;

@Data
public class EmployeRequestDTO {
    private String nom;
    private String poste;
    private String email;
    private String password;
    private String role;
    private Long machineId;
}
