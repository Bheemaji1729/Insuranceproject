package com.example.demo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "insurance_data")
public class Employee {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "insurance_id")
    private long id;

    @Column(name = "insurance_policy_name")
    private String firstName;

    @Column(name = "insurance_type")
    private String lastName;

    @Column(name = "insurance_coverage(self/family)")
    private String email;
	
    public Employee()
	{
		
	}

    public Employee(long id, String firstName, String lastName, String email) {
		// TODO Auto-generated constructor stub
    	this.id=id;this.firstName=firstName;this.lastName=lastName;this.email=email;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
}